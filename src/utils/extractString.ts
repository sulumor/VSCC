export function getInformationsFromStravaEmbedString(embedString: string) {
  const stravaId = getId(embedString)
  const stravaHash = getHash(embedString)
  if (!stravaId) return null
  return { stravaId, stravaHash }
}

function getId(embedString: string): string | null {
  const match = embedString.match(/data-embed-id="[^"]*"/)
  if (!match) return null
  return match[0].split('"')[1]
}

function getHash(embedString: string): string | null {
  const match = embedString.match(/data-map-hash="[^"]*"/)
  if (!match) return null
  return match[0].split('"')[1]
}
