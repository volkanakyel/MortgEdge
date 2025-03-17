export interface Step {
  title: string
  icon: 'user' | 'location' | 'info' | 'document'
  status?: 'Complete' | 'In progress' | null
}
