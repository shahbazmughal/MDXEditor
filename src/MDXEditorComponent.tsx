import React, { useState } from 'react';
import {
  MDXEditor,
  headingsPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  CodeToggle,
  CreateLink,
  imagePlugin,
  InsertImage,
  InsertTable,
  tablePlugin,
  linkPlugin,
  linkDialogPlugin,
  listsPlugin,
  diffSourcePlugin,
  DiffSourceToggleWrapper
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

interface MDXEditorComponentProps {
    changedData: any; // The updated data passed from the App
    setChangedData: (data: any) => void; // Function to update the updatedData state in App
}

const MDXEditorComponent: React.FC<MDXEditorComponentProps> = ({ changedData, setChangedData }) => {
    const [editorContent, setEditorContent] = useState(changedData || '');

  // Handle editor content changes
  const handleEditorChange = (newContent: string) => {
    console.log('Editor content changed:', newContent);
    setEditorContent(newContent);
    setChangedData(newContent);
  };

  // Image upload handler to simulate image file handling
  const handleImageUpload = async (file: File) => {
    if (!file) {
      console.error('No file selected.');
      return Promise.reject('No file selected.');
    }
  
    const reader = new FileReader();
    
    return new Promise<string>((resolve, reject) => {
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result as string); // Return base64 encoded string
        } else {
          reject('Image loading failed');
        }
      };
      
      reader.onerror = (error) => {
        reject(`Error reading file: ${error}`);
      };
  
      reader.readAsDataURL(file);
    });
  };

  return (
      <MDXEditor
        markdown={editorContent} // Pass the editorContent to the MDXEditor
        onChange={handleEditorChange}
        plugins={[
          headingsPlugin(),
          linkPlugin(),
          linkDialogPlugin({
            linkAutocompleteSuggestions: ['https://virtuoso.dev', 'https://mdxeditor.dev']
          }),
          listsPlugin(),
          imagePlugin({
            imageUploadHandler: handleImageUpload, // Use the updated image upload handler without preview
            imageAutocompleteSuggestions: ['https://picsum.photos/200/300', 'https://picsum.photos/200']
          }),
          tablePlugin(),
          diffSourcePlugin({ diffMarkdown: editorContent, viewMode: 'rich-text' }),
          toolbarPlugin({
            toolbarClassName: 'my-classname',
            toolbarContents: () => (
              <>
                {/* Formatting Buttons */}
                <BoldItalicUnderlineToggles />

                {/* Code Button */}
                <CodeToggle />

                {/* Create Link Button */}
                <CreateLink />

                {/* Insert Image Button */}
                <InsertImage />

                {/* Insert Table Button */}
                <InsertTable />

                {/* Undo/Redo Buttons */}
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                </DiffSourceToggleWrapper>
              </>
            ),
          })
        ]}
      />
  );
};

export default MDXEditorComponent;
