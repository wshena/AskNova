import { generateChat } from "@/config/gemini";
import supabase from "@/lib/supabase/client";
import { generateTitle } from "@/lib/utils";

export async function generateConversations({
  userId,
  prompt
}: {
  userId: string
  prompt: string
}) {
  // generate title dari prompt
  const title = await generateTitle(prompt) || 'Percakapan Baru';

  // 1) buat channel baru
  const { data: ch, error: chErr } = await supabase
    .from('channel')
    .insert({ user_id: userId, title })
    .select('id')
    .single()

  if (chErr) return { success: false, error: chErr.message }

  // 2) buat message pertama
  const { data: msg, error: msgErr } = await supabase
    .from('message')
    .insert({
      channel_id: ch.id,
      role: 'user',
      content: prompt
    })
    .select('id, content')
    .single()

  if (msgErr) return { success: false, error: msgErr.message }

  // 3) buat answer pertama untuk message itu
  const ans = await generateChat(msg.content)
  const { error: ansErr } = await supabase
    .from('answer')
    .insert({
      channel_id: ch.id,     // ← snake_case!
      message_id: msg.id,     // ← snake_case!
      role: 'assistant',
      content: ans,
    })
    
  if (ansErr) return { success: false, error: ansErr.message }

  return {
    success: true,
    data: { channelId: ch.id, title: 'Judul Sementara' }
  }
}

export async function addMessage({
  channelId,
  role,
  content
}: {
  channelId: string   // ini UUID string
  role: 'user' | 'assistant'
  content: string
}) {
  const { data, error } = await supabase
    .from('message')
    .insert({
      channel_id: channelId,
      role,
      content
    })
    .select('id, content')
    .single()

  if (error) return { success: false, error: error.message, id: null }
  console.log(data?.id)
  return { success: true, id: data?.id, content: data?.content }
}

export async function addAnswer({
  channelId,
  messageId,
  role,
  content
}: {
  channelId: string   // UUID
  messageId: string   // UUID
  role: 'assistant'
  content: string
}) {
  const { data, error } = await supabase
    .from('answer')
    .insert({
      channel_id: channelId,
      message_id: messageId,
      role,
      content
    })
    .select('id')   // kalau mau tahu ID jawaban-nya
    .single()

  if (error) return { success: false, error: error.message }
  return { success: true, data }
}

export async function getUserCurrentConversations(
  userId: string,
  channelId?: string
) {
  // 1) userId wajib
  if (!userId) return null;

  // 2) siapkan query dasar
  let query = supabase
    .from("channel")
    .select("id, title")
    .eq("user_id", userId)

  // 3) kalau ada channelId, apply filter tambahan
  if (channelId) {
    // cari by ID
    query = query.eq("id", channelId);
  } else {
    // kalau belum ada channelId, ambil yang paling baru
    query = query
      .order("created_at", { ascending: false })
      .limit(1);
  }

  // 4) karena kita hanya butuh satu, gunakan .maybeSingle()
  const { data, error } = await query.maybeSingle();

  if (error) {
    console.error("getUserCurrentConversations error:", error);
    return null;
  }
  return data;
}

export async function getAllUserConversations(userId:string) {
  try {
    const { data, error } = await supabase
      .from("channel")
      .select("id, title")
      .eq("user_id", userId)

    console.log('Response data:', data);
    console.log('Response error:', error);

    if (error || !data || data.length === 0) return null;
    return data; 
  } catch (err) {
    console.error('Error saat menjalankan query:', err);
    return null;
  }
}

export async function getMessageFromConversations(channelId: string) {
  const { data, error } = await supabase
    .from('message')
    .select('*')
    .eq('channel_id', channelId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error(error)
    return null
  }
  return data
}

export async function getAnswerFromSpesificMessage(messageId: string) {
  const { data, error } = await supabase
    .from('answer')
    .select('*')
    .eq('message_id', messageId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error(error)
    return null
  }
  return data
}

// utils/db.action.ts
export async function deleteChannel(channelId: string) {
  // 1) Hapus answers dulu (jika tabel answer ada FK ke channel)
  const { error: ansErr } = await supabase
    .from('answer')
    .delete()
    .eq('channel_id', channelId);
  if (ansErr) {
    console.error('gagal hapus answer:', ansErr);
    return { success: false, error: ansErr.message };
  }

  // 2) Hapus messages
  const { error: msgErr } = await supabase
    .from('message')
    .delete()
    .eq('channel_id', channelId);
  if (msgErr) {
    console.error('gagal hapus message:', msgErr);
    return { success: false, error: msgErr.message };
  }

  // 3) Baru hapus channel
  const { data, error: chErr } = await supabase
    .from('channel')
    .delete()
    .eq('id', channelId);
  if (chErr) {
    console.error('gagal hapus channel:', chErr);
    return { success: false, error: chErr.message };
  }

  return { success: true, data };
}
