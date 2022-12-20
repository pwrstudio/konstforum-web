<script lang="ts">
  import { onMount } from "svelte"
  import mapboxgl from "mapbox-gl"
  import "mapbox-gl/dist/mapbox-gl.css"
  //   import mapboxSdk from "@mapbox/mapbox-sdk"

  const center = { lat: 55.8725675, lon: 13.5645621 }
  let map

  mapboxgl.accessToken =
    "pk.eyJ1IjoicHdyc3R1ZGlvIiwiYSI6ImNsYnc5NmQzOTB2MWQzcW55ZzAyODRucG8ifQ.6RvyoY4e0kM10ABYxicjBg"

  //   const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken })

  //   console.log(mapboxClient)

  //   mapboxClient.geocoding
  //     .forwardGeocode({
  //       query: "Malmö",
  //       autocomplete: false,
  //       limit: 1,
  //     })
  //     .send()
  //     .then(response => {
  //       if (
  //         !response ||
  //         !response.body ||
  //         !response.body.features ||
  //         !response.body.features.length
  //       ) {
  //         console.error("Invalid response:")
  //         console.error(response)
  //         return
  //       }
  //       const feature = response.body.features[0]
  //       console.log(feature)
  //     })

  // Create a marker and add it to the map.

  onMount(async () => {
    map = new mapboxgl.Map({
      container: "map",
      center: center,
      zoom: 7.5,
      style: "mapbox://styles/mapbox/light-v11",
    })

    // new mapboxgl.Marker().setLngLat(center).addTo(map)
  })
</script>

<!-- on:recentre={e => console.log(e.detail.center.lat, e.detail.center.lng) }  -->

<div class="map" id="map" />

<style lang="scss">
  .map {
    mix-blend-mode: multiply;
    height: 100%;
    width: 100%;
  }
</style>
