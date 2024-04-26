import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import storeRoutes from "./routes/store.routes.js";
import animeRoutes from "./routes/anime.routes.js";
import anime_genreRoutes from "./routes/anime_genre.routes.js";
import episodeRoutes from "./routes/episode.routes.js";
import eventRoutes from "./routes/event.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;


dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cors());
app.use(cookieParser());

app.use("/anime", animeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/store", storeRoutes);
app.use("/genre", anime_genreRoutes);

app.use("/event", eventRoutes);

app.use("/episodes", episodeRoutes);






server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
