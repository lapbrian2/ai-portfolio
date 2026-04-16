export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, type, message } = body

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  // Log for now — replace with Formspree, Resend, or Supabase later
  console.log('Contact form submission:', { name, email, type, message })

  return { success: true }
})
