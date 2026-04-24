import { Button, FieldError, Form, Input, Label, TextArea, TextField } from "@heroui/react";
import React, { useState } from "react"

interface NewPostFormProps {
    onSuccess: () => void;
    onSwitchOpenModal: (isOpen: boolean) => void;
}

export const NewPostForm = (props: NewPostFormProps) => {
    const {onSwitchOpenModal} = props;
    const [category, setCategory] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [postContent, setPostContent] = useState<string>("");

    const handleNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Handle function");
    }

    return(
        <>
            <div className="mb-6 flex flex-row gap-10">
                <div>
                    <h1 className="text-[28px] font-bold leading-tight text-[#0B2A4A]">Create New Post</h1>{/* CHECAR SOLORES DE LA PALETA */}
                </div>
            </div>
            <Form className="flex w-full max-w-md flex-col gap-4 p-2" onSubmit={handleNewPost}>
                <TextField
                    name="category"
                    type="category"
                    onChange={setCategory}
                    >
                    <Label className="font-bold text-[#0B2A4A]">Category</Label>
                    <Input />
                    <FieldError />
                </TextField>
                <TextField
                    name="title"
                    type="title"
                    onChange={setTitle}
                    >
                    <Label className="font-bold text-[#0B2A4A]">Title</Label>
                    <Input placeholder="What's on your mind?" />
                    <FieldError />
                </TextField>
                <Label className="font-bold text-[#0B2A4A]">Content</Label>
                <TextArea
                    name="content"
                    placeholder="Share your thoughts with the community..."
                    value={postContent}
                    className="h-32 w-full"
                    onChange={(e) => setPostContent(e.target.value)}
                />
                <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-6">
                    <Button
                        type="button"
                        className="h-11 rounded-xl bg-white text-[#0B2A4A] px-5 font-semibold border-2 border-[#1E2B44]"
                        onPress={() => onSwitchOpenModal(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        className="h-11 rounded-xl bg-[#1E2B44] px-5 font-semibold text-white"
                    >
                        Post
                    </Button>
                </div>
            </Form>
        </>
    )
}