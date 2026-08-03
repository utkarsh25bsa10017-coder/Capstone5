import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const KEY_LENGTH = 32
const IV_LENGTH = 16
const SALT_LENGTH = 64
const TAG_LENGTH = 16

function getKey(): Buffer {
  const secret = process.env.ENCRYPTION_KEY!
  if (!secret || secret.length < 32) {
    throw new Error('ENCRYPTION_KEY must be at least 32 characters')
  }
  return scryptSync(secret, 'salt', KEY_LENGTH)
}

export function encrypt(text: string): string {
  const key = getKey()
  const iv = randomBytes(IV_LENGTH)
  const cipher = createCipheriv(ALGORITHM, key, iv)
  
  const encrypted1 = cipher.update(text, 'utf8')
  const encrypted2 = cipher.final()
  const encrypted = Buffer.concat([encrypted1, encrypted2])
  const tag = cipher.getAuthTag()
  
  return Buffer.concat([iv, encrypted, tag]).toString('base64')
}

export function decrypt(encryptedData: string): string {
  const key = getKey()
  const buffer = Buffer.from(encryptedData, 'base64')
  
  const iv = buffer.subarray(0, IV_LENGTH)
  const tag = buffer.subarray(buffer.length - TAG_LENGTH)
  const encrypted = buffer.subarray(IV_LENGTH, buffer.length - TAG_LENGTH)
  
  const decipher = createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(tag)
  
  const decrypted1 = decipher.update(encrypted)
  const decrypted2 = decipher.final()
  
  return Buffer.concat([decrypted1, decrypted2]).toString('utf8')
}

export function encryptJson<T>(obj: T): string {
  return encrypt(JSON.stringify(obj))
}

export function decryptJson<T>(encryptedData: string): T {
  return JSON.parse(decrypt(encryptedData))
}