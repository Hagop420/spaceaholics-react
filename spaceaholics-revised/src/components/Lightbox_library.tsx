/*!
 * Lightbox v2.11.2
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 *
 * @preserve
 */

import React, { useEffect } from 'react';
import $ from 'jquery'; // Import jQuery if not already done

interface LightboxOptions {
  albumLabel: string;
  alwaysShowNavOnTouchDevices: boolean;
  fadeDuration: number;
  fitImagesInViewport: boolean;
  imageFadeDuration: number;
  positionFromTop: number;
  resizeDuration: number;
  showImageNumberLabel: boolean;
  wrapAround: boolean;
  disableScrolling: boolean;
  sanitizeTitle: boolean;
}

interface LightboxImage {
  alt?: string;
  link: string;
  title?: string;
}

class Lightbox {
  private album: LightboxImage[];
  private currentImageIndex: number | undefined;
  private options: LightboxOptions;

  constructor(options: Partial<LightboxOptions> = {}) {
    this.album = [];
    this.currentImageIndex = undefined;
    this.init();

    // options
    this.options = {
      ...Lightbox.defaults,
      ...options,
    };
  }

  // Descriptions of all options available on the demo site:
  // http://lokeshdhakar.com/projects/lightbox2/index.html#options
  static defaults: LightboxOptions = {
    albumLabel: 'Image %1 of %2',
    alwaysShowNavOnTouchDevices: false,
    fadeDuration: 600,
    fitImagesInViewport: true,
    imageFadeDuration: 600,
    positionFromTop: 50,
    resizeDuration: 700,
    showImageNumberLabel: true,
    wrapAround: false,
    disableScrolling: false,
    sanitizeTitle: false,
  };

  option(options: Partial<LightboxOptions>): void {
    this.options = {
      ...this.options,
      ...options,
    };
  }

  imageCountLabel(currentImageNum: number, totalImages: number): string {
    return this.options.albumLabel
      .replace(/%1/g, currentImageNum.toString())
      .replace(/%2/g, totalImages.toString());
  }

  init(): void {
    // Both enable and build methods require the body tag to be in the DOM.
    $(document).ready(() => {
      this.enable();
      this.build();
    });
  }

  enable(): void {
    $('body').on(
      'click',
      'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]',
      (event) => {
        this.start($(event.currentTarget));
        return false;
      },
    );
  }

  build(): void {
    if ($('#lightbox').length > 0) {
      return;
    }

    // The two root nodes generated, #lightboxOverlay and #lightbox are given
    // tabindex attrs so they are focusable. We attach our keyboard event
    // listeners to these two elements, and not the document. Clicking anywhere
    // while Lightbox is opened will keep the focus on or inside one of these
    // two elements.
    //
    // We do this so we can prevent propagation of the Esc keypress when
    // Lightbox is open. This prevents it from interfering with other components
    // on the page below.
    //
    // Github issue: https://github.com/lokesh/lightbox2/issues/663
    $(
      '<div id="lightboxOverlay" tabindex="-1" class="lightboxOverlay"></div><div id="lightbox" tabindex="-1" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt=""/><div class="lb-nav"><a class="lb-prev" aria-label="Previous image" href="" ></a><a class="lb-next" aria-label="Next image" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>',
    ).appendTo($('body'));

    // Cache jQuery objects
    this.$lightbox = $('#lightbox');
    this.$overlay = $('#lightboxOverlay');
    this.$outerContainer = this.$lightbox.find('.lb-outerContainer');
    this.$container = this.$lightbox.find('.lb-container');
    this.$image = this.$lightbox.find('.lb-image');
    this.$nav = this.$lightbox.find('.lb-nav');

    // Store css values for future lookup
    this.containerPadding = {
      top: parseInt(this.$container.css('padding-top'), 10),
      right: parseInt(this.$container.css('padding-right'), 10),
      bottom: parseInt(this.$container.css('padding-bottom'), 10),
      left: parseInt(this.$container.css('padding-left'), 10),
    };

    this.imageBorderWidth = {
      top: parseInt(this.$image.css('border-top-width'), 10),
      right: parseInt(this.$image.css('border-right-width'), 10),
      bottom: parseInt(this.$image.css('border-bottom-width'), 10),
      left: parseInt(this.$image.css('border-left-width'), 10),
    };

    // Attach event handlers to the newly minted DOM elements
    this.$overlay.hide().on('click', () => {
      this.end();
      return false;
    });

    this.$lightbox.hide().on('click', (event) => {
      if ($(event.target).attr('id') === 'lightbox') {
        this.end();
      }
    });

    this.$outerContainer.on('click', (event) => {
      if ($(event.target).attr('id') === 'lightbox') {
        this.end();
      }
      return false;
    });

    this.$lightbox.find('.lb-prev').on('click', () => {
      if (this.currentImageIndex === 0) {
        this.changeImage(this.album.length - 1);
      } else {
        this.changeImage(this.currentImageIndex - 1);
      }
      return false;
    });

    this.$lightbox.find('.lb-next').on('click', () => {
      if (this.currentImageIndex === this.album.length - 1) {
        this.changeImage(0);
      } else {
        this.changeImage(this.currentImageIndex + 1);
      }
      return false;
    });

    /*
      Show context menu for image on right-click

      There is a div containing the navigation that spans the entire image and lives above of it. If
      you right-click, you are right clicking this div and not the image. This prevents users from
      saving the image or using other context menu actions with the image.

      To fix this, when we detect the right mouse button is pressed down, but not yet clicked, we
      set pointer-events to none on the nav div. This is so that the upcoming right-click event on
      the next mouseup will bubble down to the image. Once the right-click/contextmenu event occurs
      we set the pointer events back to auto for the nav div so it can capture hover and left-click
      events as usual.
     */
    this.$nav.on('mousedown', (event) => {
      if (event.which === 3) {
        this.$nav.css('pointer-events', 'none');

        this.$lightbox.one('contextmenu', () => {
          setTimeout(() => {
            this.$nav.css('pointer-events', 'auto');
          }, 0);
        });
      }
    });

    this.$lightbox.find('.lb-loader, .lb-close').on('click', () => {
      this.end();
      return false;
    });
  }

  // Show overlay and lightbox. If the image is part of a set, add siblings to album array.
  start($link: JQuery): void {
    const $window = $(window);

    $window.on('resize', this.sizeOverlay);

    this.sizeOverlay();

    this.album = [];
    let imageNumber = 0;

    function addToAlbum($link: JQuery): void {
      this.album.push({
        alt: $link.attr('data-alt'),
        link: $link.attr('href'),
        title: $link.attr('data-title') || $link.attr('title'),
      });
    }

    // Support both data-lightbox attribute and rel attribute implementations
    const dataLightboxValue = $link.attr('data-lightbox');
    let $links;

    if (dataLightboxValue) {
      $links = $(
        $link.prop('tagName') + '[data-lightbox="' + dataLightboxValue + '"]',
      );
      for (let i = 0; i < $links.length; i++) {
        addToAlbum($($links[i]));
        if ($links[i] === $link[0]) {
          imageNumber = i;
        }
      }
    } else {
      if ($link.attr('rel') === 'lightbox') {
        // If image is not part of a set
        addToAlbum($link);
      } else {
        // If image is part of a set
        $links = $($link.prop('tagName') + '[rel="' + $link.attr('rel') + '"]');
        for (let j = 0; j < $links.length; j++) {
          addToAlbum($($links[j]));
          if ($links[j] === $link[0]) {
            imageNumber = j;
          }
        }
      }
    }

    // Position Lightbox
    const top = $window.scrollTop() + this.options.positionFromTop;
    const left = $window.scrollLeft();
    this.$lightbox
      .css({
        top: top + 'px',
        left: left + 'px',
      })
      .fadeIn(this.options.fadeDuration);

    // Disable scrolling of the page while open
    if (this.options.disableScrolling) {
      $('body').addClass('lb-disable-scrolling');
    }

    this.changeImage(imageNumber);
  }

  changeImage(imageNumber: number): void {
    const filename = this.album[imageNumber].link;
    const filetype = filename.split('.').slice(-1)[0];
    const $image = this.$lightbox.find('.lb-image');

    // Disable keyboard nav during transitions
    this.disableKeyboardNav();

    // Show loading state
    this.$overlay.fadeIn(this.options.fadeDuration);
    $('.lb-loader').fadeIn('slow');
    this.$lightbox
      .find(
        '.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption',
      )
      .hide();
    this.$outerContainer.addClass('animating');

    // When image to show is preloaded, we send the width and height to sizeContainer()
    const preloader = new Image();
    preloader.onload = () => {
      const $preloader = $(preloader);
      $image.attr({
        alt: this.album[imageNumber].alt,
        src: filename,
      });

      $image.width(preloader.width);
      $image.height(preloader.height);

      const windowWidth = $(window).width();
      const windowHeight = $(window).height();

      // Calculate the max image dimensions for the current viewport.
      // Take into account the border around the image and an additional 10px gutter on each side.
      let maxImageWidth =
        windowWidth -
        this.containerPadding.left -
        this.containerPadding.right -
        this.imageBorderWidth.left -
        this.imageBorderWidth.right -
        20;
      let maxImageHeight =
        windowHeight -
        this.containerPadding.top -
        this.containerPadding.bottom -
        this.imageBorderWidth.top -
        this.imageBorderWidth.bottom -
        this.options.positionFromTop -
        70;

      /*
      Since many SVGs have small intrinsic dimensions, but they support scaling
      up without quality loss because of their vector format, max out their
      size.
      */
      if (filetype === 'svg') {
        $image.width(maxImageWidth);
        $image.height(maxImageHeight);
      }

      // Fit image inside the viewport.
      if (this.options.fitImagesInViewport) {
        // Check if image size is larger then maxWidth|maxHeight in settings
        if (this.options.maxWidth && this.options.maxWidth < maxImageWidth) {
          maxImageWidth = this.options.maxWidth;
        }
        if (this.options.maxHeight && this.options.maxHeight < maxImageHeight) {
          maxImageHeight = this.options.maxHeight;
        }
      } else {
        maxImageWidth =
          this.options.maxWidth || preloader.width || maxImageWidth;
        maxImageHeight =
          this.options.maxHeight || preloader.height || maxImageHeight;
      }

      // Is the current image's width or height is greater than the maxImageWidth or maxImageHeight
      // option than we need to size down while maintaining the aspect ratio.
      if (
        preloader.width > maxImageWidth ||
        preloader.height > maxImageHeight
      ) {
        if (
          preloader.width / maxImageWidth >
          preloader.height / maxImageHeight
        ) {
          const imageWidth = maxImageWidth;
          const imageHeight = parseInt(
            preloader.height / (preloader.width / imageWidth),
            10,
          );
          $image.width(imageWidth);
          $image.height(imageHeight);
        } else {
          const imageHeight = maxImageHeight;
          const imageWidth = parseInt(
            preloader.width / (preloader.height / imageHeight),
            10,
          );
          $image.width(imageWidth);
          $image.height(imageHeight);
        }
      }
      this.sizeContainer($image.width(), $image.height());
    };

    // Preload image before showing
    preloader.src = this.album[imageNumber].link;
    this.currentImageIndex = imageNumber;
  }

  sizeOverlay(): void {
    /*
    We use a setTimeout 0 to pause JS execution and let the rendering catch-up.
    Why do this? If the `disableScrolling` option is set to true, a class is added to the body
    tag that disables scrolling and hides the scrollbar. We want to make sure the scrollbar is
    hidden before we measure the document width, as the presence of the scrollbar will affect the
    number.
    */
    setTimeout(() => {
      this.$overlay.width($(document).width()).height($(document).height());
    }, 0);
  }

  sizeContainer(imageWidth: number, imageHeight: number): void {
    const oldWidth = this.$outerContainer.outerWidth();
    const oldHeight = this.$outerContainer.outerHeight();
    const newWidth =
      imageWidth +
      this.containerPadding.left +
      this.containerPadding.right +
      this.imageBorderWidth.left +
      this.imageBorderWidth.right;
    const newHeight =
      imageHeight +
      this.containerPadding.top +
      this.containerPadding.bottom +
      this.imageBorderWidth.top +
      this.imageBorderWidth.bottom;

    const postResize = () => {
      this.$lightbox.find('.lb-dataContainer').width(newWidth);
      this.$lightbox.find('.lb-prevLink').height(newHeight);
      this.$lightbox.find('.lb-nextLink').height(newHeight);

      // Set focus on one of the two root nodes so keyboard events are captured.
      this.$overlay.focus();

      this.showImage();
    };

    if (oldWidth !== newWidth || oldHeight !== newHeight) {
      this.$outerContainer.animate(
        {
          width: newWidth,
          height: newHeight,
        },
        this.options.resizeDuration,
        'swing',
        () => {
          postResize();
        },
      );
    } else {
      postResize();
    }
  }

  showImage(): void {
    this.$lightbox.find('.lb-loader').stop(true).hide();
    this.$lightbox.find('.lb-image').fadeIn(this.options.imageFadeDuration);

    this.updateNav();
    this.updateDetails();
    this.preloadNeighboringImages();
    this.enableKeyboardNav();
  }

  updateNav(): void {
    // Check to see if the browser supports touch events. If so, we take the conservative approach
    // and assume that mouse hover events are not supported and always show prev/next navigation
    // arrows in image sets.
    let alwaysShowNav = false;
    try {
      document.createEvent('TouchEvent');
      alwaysShowNav = this.options.alwaysShowNavOnTouchDevices ? true : false;
    } catch (e) {}

    this.$lightbox.find('.lb-nav').show();

    if (this.album.length > 1) {
      if (this.options.wrapAround) {
        if (alwaysShowNav) {
          this.$lightbox.find('.lb-prev, .lb-next').css('opacity', '1');
        }
        this.$lightbox.find('.lb-prev, .lb-next').show();
      } else {
        if (this.currentImageIndex > 0) {
          this.$lightbox.find('.lb-prev').show();
          if (alwaysShowNav) {
            this.$lightbox.find('.lb-prev').css('opacity', '1');
          }
        }
        if (this.currentImageIndex < this.album.length - 1) {
          this.$lightbox.find('.lb-next').show();
          if (alwaysShowNav) {
            this.$lightbox.find('.lb-next').css('opacity', '1');
          }
        }
      }
    }
  }

  updateDetails(): void {
    // Enable anchor clicks in the injected caption html.
    // Thanks Nate Wright for the fix. @https://github.com/NateWr
    if (
      typeof this.album[this.currentImageIndex].title !== 'undefined' &&
      this.album[this.currentImageIndex].title !== ''
    ) {
      const $caption = this.$lightbox.find('.lb-caption');
      if (this.options.sanitizeTitle) {
        $caption.text(this.album[this.currentImageIndex].title);
      } else {
        $caption.html(this.album[this.currentImageIndex].title);
      }
      $caption.fadeIn('fast');
    }

    if (this.album.length > 1 && this.options.showImageNumberLabel) {
      const labelText = this.imageCountLabel(
        this.currentImageIndex + 1,
        this.album.length,
      );
      this.$lightbox.find('.lb-number').text(labelText).fadeIn('fast');
    } else {
      this.$lightbox.find('.lb-number').hide();
    }

    this.$outerContainer.removeClass('animating');

    this.$lightbox
      .find('.lb-dataContainer')
      .fadeIn(this.options.resizeDuration, () => this.sizeOverlay());
  }

  preloadNeighboringImages(): void {
    if (this.album.length > this.currentImageIndex + 1) {
      const preloadNext = new Image();
      preloadNext.src = this.album[this.currentImageIndex + 1].link;
    }
    if (this.currentImageIndex > 0) {
      const preloadPrev = new Image();
      preloadPrev.src = this.album[this.currentImageIndex - 1].link;
    }
  }

  enableKeyboardNav(): void {
    this.$lightbox.on('keyup.keyboard', this.keyboardAction);
    this.$overlay.on('keyup.keyboard', this.keyboardAction);
  }

  disableKeyboardNav(): void {
    this.$lightbox.off('.keyboard');
    this.$overlay.off('.keyboard');
  }

  keyboardAction(event: JQuery.KeyUpEvent): void {
    const KEYCODE_ESC = 27;
    const KEYCODE_LEFTARROW = 37;
    const KEYCODE_RIGHTARROW = 39;

    const keycode = event.keyCode;
    if (keycode === KEYCODE_ESC) {
      // Prevent bubbling so as to not affect other components on the page.
      event.stopPropagation();
      this.end();
    } else if (keycode === KEYCODE_LEFTARROW) {
      if (this.currentImageIndex !== 0) {
        this.changeImage(this.currentImageIndex - 1);
      } else if (this.options.wrapAround && this.album.length > 1) {
        this.changeImage(this.album.length - 1);
      }
    } else if (keycode === KEYCODE_RIGHTARROW) {
      if (this.currentImageIndex !== this.album.length - 1) {
        this.changeImage(this.currentImageIndex + 1);
      } else if (this.options.wrapAround && this.album.length > 1) {
        this.changeImage(0);
      }
    }
  }

  // Closing time. :-(
  end(): void {
    this.disableKeyboardNav();
    $(window).off('resize', this.sizeOverlay);
    this.$lightbox.fadeOut(this.options.fadeDuration);
    this.$overlay.fadeOut(this.options.fadeDuration);

    if (this.options.disableScrolling) {
      $('body').removeClass('lb-disable-scrolling');
    }
  }
}

export default new Lightbox();
