import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const getLikes = (req, res) => {

    console.log('get likes')

    const q = "SELECT userId FROM likes WHERE postId = ?"

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err)
        
        // return res.status(200).json(data)
        return res.status(200).json(data.map((like) => like.userId))
    })
    
}

export const addLike = (req, res) => {

    console.log('add likes')

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")
    
    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid!')
        
        const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)"
        const values = [
            userInfo.id,
            req.body.postId
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            
            return res.status(200).json("Post has been liked")
        })
    })
    
}

export const deleteLike = (req, res) => {

    console.log('delete likes')

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")
    
    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid!')
        
        const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?"
        const values = [
            userInfo.id,
            req.query.postId
        ]

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err)
            
            return res.status(200).json("Post has been desliked")
        })
    })
    
}