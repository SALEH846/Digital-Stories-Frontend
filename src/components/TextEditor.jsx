import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({ content, setContent, username, currentContent }) => {
	return (
		<>
			<Editor
				initialValue={currentContent ? currentContent : null}
				value={content}
				onEditorChange={(e) => setContent(e)}
				init={{
					height: 300,
					width: "100%",
					menubar: false,
					placeholder: `What's on your mind ${username}?`,
					plugins: [
						"a11ychecker",
						"advlist",
						"advcode",
						"advtable",
						"autolink",
						"checklist",
						"export",
						"lists",
						"link",
						"image",
						"charmap",
						"preview",
						"anchor",
						"searchreplace",
						"visualblocks",
						"powerpaste",
						"fullscreen",
						"formatpainter",
						"insertdatetime",
						"media",
						"table",
						"help",
						"wordcount",
					],
					toolbar:
						"undo redo | fontfamily fontsize casechange blocks | bold italic underline | " +
						"forecolor backcolor removeformat | " +
						"bullist numlist checklist | a11ycheck code",
					content_style:
						"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
				}}
			/>
		</>
	);
};

export default TextEditor;
