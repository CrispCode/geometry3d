'use strict'

import { measure } from './measure.js'

export class Runner {
  #name = ''
  get name () {
    return this.#name
  }

  constructor ( name ) {
    this.#name = name
  }

  #tasks = new Map()

  add ( name, task, count = 1000, progress = () => {} ) {
    this.#tasks.set( name, {
      name: name,
      task: task,
      count: count,
      progress: progress
    } )
  }

  remove ( name ) {
    this.#tasks.delete( name )
  }

  clear () {
    this.#tasks.clear()
  }

  get count () {
    return this.#tasks.size
  }

  get tasks () {
    return [ ...this.#tasks.keys ]
  }

  run () {
    const iterator = this.#tasks.values()
    const loop = () => {
      const entry = iterator.next()
      if ( entry.done ) {
        return
      }
      return measure( entry.value.task, entry.value.count, true, entry.value.progress )
        .then( ( duration ) => {
          console.log( entry.value.name, JSON.stringify( duration ) )
          return loop()
        } )
    }
    return loop()
  }
}
