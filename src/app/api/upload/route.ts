import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

export const POST = async (req: NextRequest) => {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    if (file.size > 2 * 1024 * 1024) {
        return NextResponse.json({ error: "File size too large (max 2MB)." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "_" + (file as File).name.replaceAll(" ", "_");

    try {
        const uploadDir = path.join(process.cwd(), "public/uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        await writeFile(
            path.join(uploadDir, filename),
            buffer
        );
        return NextResponse.json({
            message: "Success",
            url: `/uploads/${filename}`,
            filename: filename
        }, { status: 201 });
    } catch (error) {
        console.log("Error occurred ", error);
        return NextResponse.json({ Message: "Failed", status: 500 });
    }
};
