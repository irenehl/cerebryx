import { Metadata } from 'next'
import HistoryView from '@/components/history/HistoryView'

export const metadata: Metadata = {
  title: 'History • Cerebryx',
  description: 'View your study session history',
}

export default function HistoryPage() {
  return <HistoryView />
}





