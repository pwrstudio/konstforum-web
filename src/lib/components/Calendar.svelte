<script lang="ts">
  import { onDestroy } from "svelte"
  import LargeArrowLeft from "$lib/graphics/LargeArrowLeft.svelte"
  import LargeArrowRight from "$lib/graphics/LargeArrowRight.svelte"
  import { filteredEvents, activeEventSlug } from "$lib/stores"
  import {
    format,
    getYear,
    getMonth,
    addMonths,
    endOfMonth,
    startOfMonth,
    getDay,
    isWeekend,
    getDate,
    isPast,
    isSameDay,
  } from "date-fns"

  let calendarIndex = 5
  const weekdays = ["M", "T", "O", "T", "F", "L", "S"]

  const pad = (n: Number) => (n < 10 ? "0" + String(n) : String(n))

  const makeSpacers = n => {
    n = n == 0 ? 6 : n - 1
    let retArray = []
    for (let i = 0; i < n; i++) {
      retArray.push({})
    }
    return retArray
  }

  interface Day {
    day: number
    date: number
    event: boolean
    eventPost?: any
    weekend: boolean
    past: boolean
    today: boolean
  }

  interface Month {
    index: number
    name: String
    year: number
    numberOfDays: number
    days: Day[]
    weekDayOffset: number
    spacers: any[]
  }

  const makeDate = (monthObject: Month, day: number) => {
    return Date.parse(
      `${monthObject.year}-${pad(monthObject.index + 1)}-${day}`
    )
  }

  const makeMonth = (d: number) => {
    let monthObject: Month = {
      index: getMonth(d),
      name: format(d, "MMMM"),
      year: getYear(d),
      numberOfDays: Number(format(endOfMonth(d), "dd")),
      days: [],
      weekDayOffset: getDay(startOfMonth(d)),
      spacers: makeSpacers(getDay(startOfMonth(d))),
    }
    for (let i = 1; i <= monthObject.numberOfDays; i++) {
      let newDay: Day = {
        day: i,
        date: makeDate(monthObject, i),
        event: false,
        weekend: false,
        past: false,
        today: false,
      }
      newDay.weekend = isWeekend(newDay.date)
      newDay.past = isPast(newDay.date)
      newDay.event = $filteredEvents.some(e =>
        isSameDay(Date.parse(e.time), newDay.date)
      )
      if (newDay.event) {
        newDay.eventPost = $filteredEvents.find(e =>
          isSameDay(Date.parse(e.time), newDay.date)
        )
      }
      newDay.today = isSameDay(new Date(), newDay.date)
      monthObject.days.push(newDay)
    }
    return monthObject
  }

  // 1. Get current date (GMT)
  const currentDate = new Date()
  // 2. Render: current month, five months back & six months forward
  const months = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map(i =>
    makeMonth(addMonths(currentDate, i))
  )

  function goToEvent(event: any) {
    activeEventSlug.set(event.slug?.current)
    if (event.website) {
      window.open(event.website, "_blank").focus()
    }
  }

  onDestroy(() => {
    activeEventSlug.set("")
  })
</script>

<div class="calendar">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="calendar-navigation left"
    class:disabled={calendarIndex == 0}
    on:click={e => {
      calendarIndex = calendarIndex - 1
    }}
  >
    <LargeArrowLeft black={true} />
  </div>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="calendar-navigation right"
    class:disabled={calendarIndex == 11}
    on:click={e => {
      calendarIndex = calendarIndex + 1
    }}
  >
    <LargeArrowRight black={true} />
  </div>

  <div class="calendar-container">
    <div class="calendar-header">
      <div class="calendar-title">
        KALENDARIUM
        {months[calendarIndex].name}
        {months[calendarIndex].year}
      </div>
    </div>
    <div class="calendar-inner">
      {#each weekdays as day}
        <div class="calendar-item weekday-header">{day}</div>
      {/each}
      {#each months[calendarIndex].spacers as spacer}
        <div class="calendar-item spacer" />
      {/each}
      {#each months[calendarIndex].days as day}
        <div
          class="calendar-item day"
          class:event={day.event}
          class:weekend={day.weekend}
          class:past={day.past}
          class:today={day.today}
          on:click={() => {
            goToEvent(day.eventPost)
          }}
        >
          <div class="number">{day.day}</div>
          {#if day.event}
            <div class="dot" />
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .calendar {
    width: 100%;
    font-family: $EXPANDED_STACK;
    margin-top: 80px;
    display: flex;
    justify-content: center;
    position: relative;
    min-height: 600px;

    @include screen-size("small") {
      margin-right: auto;
      margin-left: auto;
      width: 80%;
      margin-top: 75px;
      min-height: unset;
    }

    .calendar-header {
      text-transform: uppercase;
      user-select: none;

      @include screen-size("small") {
        font-size: $FONT_SIZE_XSMALL;
      }
    }
  }

  .calendar-container {
    max-width: 700px;
  }

  .calendar-inner {
    width: 100%;
    height: 100%;
    font-family: $MONO_STACK;

    .calendar-item {
      width: 14.2%;
      height: 80px;
      float: left;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: $FONT_SIZE_MEDIUM;
      user-select: none;

      @include screen-size("small") {
        font-size: $FONT_SIZE_SMALL;
        height: 40px;
      }

      &.weekday-header {
        font-size: $FONT_SIZE_NORMAL;
        @include screen-size("small") {
          font-size: $FONT_SIZE_SMALL;
        }
      }

      &.day {
        &.event {
          cursor: pointer;
        }

        &.weekend {
          opacity: 0.5;
        }

        &.today {
          .number {
            background: $lime;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            @include screen-size("small") {
              padding: 10px;
              width: 30px;
              height: 30px;
            }
          }
        }

        .dot {
          height: 7px;
          width: 7px;
          border-radius: 50%;
          background: $black;
          position: absolute;
          bottom: 10px;
          left: calc(50% - 5px);

          @include screen-size("small") {
            bottom: 2px;
          }
        }
      }
    }
  }

  .calendar-navigation {
    position: absolute;
    top: 40%;
    height: 40px;
    width: 40px;
    z-index: 1000;
    cursor: pointer;

    @include screen-size("small") {
      position: fixed;
      top: 27%;
      height: 30px;
      width: 30px;
    }

    &.left {
      left: 10px;
    }

    &.right {
      right: 10px;
    }

    &.disabled {
      opacity: 0;
      pointer-events: none;
    }
  }
</style>
