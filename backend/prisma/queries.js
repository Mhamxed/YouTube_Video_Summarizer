import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function videos(id) {
    return await prisma.video.findMany({
        where: {
            userId: parseInt(id)
        },
        include: {
            user: true
        }
    })
}

async function userByUsername(username) {
    return await prisma.user.findFirst({
        where: {
            username: username
        }
    })
}

async function createUser(firstname, lastname, username, hashedPassword) {
    await prisma.user.create({
        data: {
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: hashedPassword
        }
    })
}

async function createVideo(VideoURL, title, channelName, channelId, videoId, duration, timestamp, viewCount, thumbnailUrl, transcript, userId) {
    await prisma.video.create({
        data: {
            VideoURL: VideoURL, 
            title: title, 
            channelName: channelName, 
            channelId: channelId, 
            videoId: videoId, 
            duration: duration,
            timestamp: timestamp,
            viewCount: viewCount, 
            thumbnailUrl: thumbnailUrl, 
            transcript: transcript, 
            userId: parseInt(userId)
        }
    })
}

async function isVideoAlreadyExists(videoId, userId) {
    const videoInfos = await prisma.video.findFirst({
        where: {
            videoId: videoId,
            userId: parseInt(userId)
        }
    })

    if (videoInfos) return true
    else return false
}

async function videoByVideoId(videoId) {
    return await prisma.video.findFirst({
        where: {
            videoId: videoId
        }
    })
}

async function videoById(id) {
    return await prisma.video.findFirst({
        where: {
            id: parseInt(id)
        }
    })
}

async function transcriptByVideoId(videoId, userId) {
    const data = await prisma.video.findFirst({
        where: {
            videoId: videoId,
            userId: parseInt(userId)
        }
    })
    return data ? data.transcript : false
}

async function updateVideoInfo(id, videoId, userId, summary, keyInsights) {
    await prisma.video.update({
        where: {
            id: id,
            videoId: videoId,
            userId: parseInt(userId)
        },
        data: {
            summary: summary,
            keyInsights: keyInsights
        }
    })
}

async function IdByVideoIdAndUserId(videoId, userId) {
    const data = await prisma.video.findFirst({
        where: {
            videoId: videoId,
            userId: parseInt(userId)
        }
    })
    return data.id
}

async function deleteVideo(id) {
    await prisma.video.delete({
        where: {
            id: id,
        }
    })
}

async function isResultExists(videoId, userId) {
    const result = await prisma.video.findFirst({
        where: {
            videoId: videoId,
            userId: parseInt(userId)
        }
    })
    return result.summary[0] != undefined
}

async function deleteVideoById(id) {
    await prisma.video.delete({
        where: {
            id: parseInt(id)
        }
    })
}
    
export default {
    videos,
    userByUsername,
    createUser,
    createVideo,
    isVideoAlreadyExists,
    videoByVideoId,
    transcriptByVideoId,
    updateVideoInfo,
    IdByVideoIdAndUserId,
    videoById,
    deleteVideo,
    isResultExists,
    deleteVideoById
}