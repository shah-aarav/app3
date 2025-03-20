import { openDB, DBSchema, IDBPDatabase } from 'idb'

interface CalendarEvent {
  id: number
  title: string
  date: string
  startTime: string
  endTime: string
  category: 'sleep' | 'diet' | 'work' | 'fitness' | 'travel'
  travelTime?: number
}

interface EventDB extends DBSchema {
  events: {
    key: number
    value: CalendarEvent
    indexes: { 'by-date': string }
  }
}

let db: IDBPDatabase<EventDB>

export async function openDatabase() {
  if (!db) {
    db = await openDB<EventDB>('events-db', 1, {
      upgrade(db) {
        const eventStore = db.createObjectStore('events', { keyPath: 'id', autoIncrement: true })
        eventStore.createIndex('by-date', 'date')
      },
    })
  }
  return db
}

export async function addEvent(event: Omit<CalendarEvent, 'id'>): Promise<number> {
  const db = await openDatabase()
  const id = await db.add('events', event as CalendarEvent)
  // Dispatch a custom event to notify other components
  window.dispatchEvent(new Event('eventsUpdated'))
  return id
}

export async function getEvents(): Promise<CalendarEvent[]> {
  const db = await openDatabase()
  const events = await db.getAll('events')
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export async function getEventsByDate(date: string): Promise<CalendarEvent[]> {
  const db = await openDatabase()
  const index = db.transaction('events').store.index('by-date')
  return index.getAll(date)
}

export async function updateEvent(event: CalendarEvent): Promise<void> {
  const db = await openDatabase()
  await db.put('events', event)
}

export async function deleteEvent(id: number): Promise<void> {
  const db = await openDatabase()
  await db.delete('events', id)
}

export type { CalendarEvent }

