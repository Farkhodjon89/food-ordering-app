import Image from "next/image"

export default function EditableLink({link, setLink}) {

    const handleChangeFile = async (e) => {
        const files = e.target?.files
        if (files.length === 1) {
            const data = new FormData
            data.set('file', files[0])
            await fetch('/api/upload', {
                method: 'POST',
                body: data,
            })
        }
    }

    return (
        <>
         {link && <Image
            className="rounded-lg w-full h-full mb-2" 
            src={link} 
            alt="avatar" 
            width={250}
            height={250}
         />}
         {!link && <div className="bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
            No image
            </div>
         }
        <label>
           <input 
             type="file" 
             className="hidden" 
             onChange={handleChangeFile} 
           />
           <span className="block border rounded-lg p-2 text-center cursor-pointer">
              Edit
           </span>
         </label>
        </>
    )
}