# Database structure / schema

Datestream uses a document based database (mongodb) to store the following date objects.

## Session
```javascript
{
  id: Id,
  type: 'session',
  partners: [...partnerIds],  // length: 1 or 2
  video: videoId,
  status: 'playing' | 'paused',
  position: timeInSeconds,
  statusChangeRequestedBy: partnerId | null
}
```

## Partner
```javascript
{
  id: Id,
  type: 'partner',
  name: partnerName,
  // maybe additional metadata
}
```

## Video
```javascript
{
  id: Id,
  type: 'video',
  name: videoName,
  length: timeInSeconds,
  // maybe additional metadata
}
```
