'use client'

import { useState, useEffect } from 'react'
import path from "path";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw } from "lucide-react"

const HOST_URL = process.env.HOST_ADDRESS || "";

async function getImage(deviceId: string) {
  const headers = {
    'deviceId': deviceId,
  }
  const res = await fetch(`${HOST_URL}/api/v1/view`, {headers});
  const photo = await res.json()
  // console.log(photo)
  return photo.image
}

export default function PhotoCardComponent({deviceId, name}: { deviceId: string, name: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageSaveTime, setImageSaveTime] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const fetchImageUrl = async () => {
    setIsLoading(true)
    setHasError(false)
    try {
      const image = await getImage(deviceId)
      // console.log(typeof image.createdAt)
      if (!image) throw new Error("geterror")
      setImageUrl(`${HOST_URL}/${image.photoId}`)
      setImageSaveTime(image.createdAt)
      // console.log(imageUrl)
    } catch (error) {
      console.error('Failed to fetch image URL:', error)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchImageUrl()
  }, [deviceId])

  const handleRefresh = () => {
    fetchImageUrl()
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg font-medium">デバイス : {name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-muted">
          {isLoading && (
            <Skeleton className="absolute inset-0" />
          )}
          {imageUrl && !hasError && (
            <img
              src={imageUrl}
              alt={`デバイス ${deviceId} の画像`}
              className={`object-cover w-full h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              画像を読み込めませんでした
            </div>
          )}
        </div>
        { imageSaveTime && !hasError && (
          <div className='pt-2 text-muted-foreground'>サーバ保存日時：{imageSaveTime}</div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        {/* <span className="text-sm text-muted-foreground">最終更新: {new Date().toLocaleString('ja-JP')}</span> */}
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleRefresh}
          aria-label="画像を更新"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}