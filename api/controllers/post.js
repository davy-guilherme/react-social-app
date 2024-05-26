import moment from 'moment'
import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const getPosts = (req, res) => {

    console.log('getPosts started')
    // return res.status(200).send('ok niva')

    const token = req.cookies.accessToken
    if (!token) return res.status(401).json('Not logged in!')

    jwt.verify(token, "secretkey", (err, userInfo) => { // user info could be the var data
        if (err) return res.status(403).json("Token is not valid!")

        console.log('token valido')

        // const q = 'SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)'
        // const q = 'SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) JOIN relationships AS r ON (p.userId = r.followedUserId AND r.followerUserId = ?)'
        const q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
                    LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ?
                    ORDER BY p.createdAt DESC`
        // const q = `
        //     SELECT 
        //         p.*, 
        //         u.id AS userId, 
        //         u.name, 
        //         u.profilePic 
        //     FROM 
        //         posts AS p 
        //     JOIN 
        //         users AS u ON (u.id = p.userId) 
        //     JOIN 
        //         relationships AS r ON (p.userId = r.followedUserId AND r.followerUserId = ?)
        // `;


        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)
            
            return res.status(200).json(data)
        })
        
    })

}

export const addPost = (req, res) => {

    console.log('addPost started')

    const token = req.cookies.accessToken
    if (!token) return res.status(401).json('Not logged in!')

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = 'INSERT INTO posts (`desc`, `img`, `createdAt`, `userId`) VALUES (?)'

        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            userInfo.id,
        ]


        db.query(q, [values], (err, data) => {
            console.log('Consulta SQL:', q);
            console.log('Valores:', values);
            if (err) return res.status(500).json(err)
            
            return res.status(200).json("Post has been created")
        })
        
    })
}