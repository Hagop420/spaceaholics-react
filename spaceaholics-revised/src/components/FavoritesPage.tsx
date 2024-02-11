export function FavoritePlanets(entry) {
  return (
    <ul className="flex flex-col items-center justify-center h-screen">
      <li>
        <img src={entry.planet_image_url} alt="" />
      </li>
    </ul>
  )
}
