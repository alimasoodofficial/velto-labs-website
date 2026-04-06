import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function SupabaseTestPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos, error } = await supabase.from('todos').select()

  if (error) {
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error fetching from Supabase:</h1>
            <p className="bg-red-50 p-4 border border-red-100 rounded-lg text-red-800 font-mono">
                {JSON.stringify(error, null, 2)}
            </p>
            <p className="mt-4 text-slate-600">
                Ensure you have created the <code className="bg-slate-100 px-1 rounded">todos</code> table in your Supabase dashboard using the SQL script provided!
            </p>
        </div>
    )
  }

  return (
    <div className="p-10">
        <h1 className="text-2xl font-bold mb-6">Supabase Connection Test</h1>
        {(!todos || todos.length === 0) ? (
            <p className="text-slate-500 italic">No data found in the `todos` table yet.</p>
        ) : (
            <ul className="space-y-2">
                {todos.map((todo) => (
                    <li key={todo.id} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="font-medium text-slate-900">{todo.name}</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}
