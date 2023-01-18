<script lang="ts">
  // import { PUBLIC_GOOGLE } from "$env/static/public"
  import { goto } from "$app/navigation"
  import { filteredPosts, urlPrefix } from "$lib/stores"
  import { onMount } from "svelte"
  import mapboxgl from "mapbox-gl"
  import "mapbox-gl/dist/mapbox-gl.css"

  const center = { lat: 55.8725675, lon: 13.5645621 }
  let map

  const GOOGLE_API_KEY = "AIzaSyDSzr2hrtfnGyoMrSVk8g7ReY6-t8_1mk8"

  mapboxgl.accessToken =
    "pk.eyJ1IjoicHdyc3R1ZGlvIiwiYSI6ImNsYnc5NmQzOTB2MWQzcW55ZzAyODRucG8ifQ.6RvyoY4e0kM10ABYxicjBg"

  function geocodeAddress(
    address: string,
    apiKey: string
  ): Promise<{ lat: number; lng: number }> {
    // Make a request to the Geocoding API to convert the address to coordinates
    const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
    return fetch(requestUrl)
      .then(response => response.json())
      .then(data => {
        // Check if the request was successful
        if (data.status === "OK") {
          // Extract the coordinates from the response
          const coordinates = data.results[0].geometry.location
          return coordinates
        } else {
          throw new Error(data.error_message)
        }
      })
  }

  onMount(async () => {
    map = new mapboxgl.Map({
      container: "map",
      center: center,
      zoom: 7.5,
      style: "mapbox://styles/mapbox/light-v11",
    })

    $filteredPosts.forEach(p => {
      if (p.locationText_sve) {
        geocodeAddress(p.locationText_sve, GOOGLE_API_KEY)
          .then(coordinates => {
            let el = document.createElement("div")
            el.className = "marker"

            new mapboxgl.Marker(el).setLngLat(coordinates).addTo(map)

            el.addEventListener("click", function () {
              goto($urlPrefix + "post/" + p.slug?.current)
            })
          })
          .catch(error => {
            console.error(error)
          })
      }
    })
  })
</script>

<div class="map" id="map" />

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .map {
    mix-blend-mode: multiply;
    height: 100%;
    width: 100%;
  }

  :global(.marker) {
    width: 30px;
    height: 30px;
    background: $black;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
</style>
