import moment from "moment/moment";
import { HiPlusCircle, HiTrash } from 'react-icons/hi'

const Article = (props) => {
  const { content, handleAdd, handleDelete } = props;
  const {
    title,
    url_to_image,
    url,
    published_at,
    source_name,
    author,
    description
  } = content;

  return (
    <div className="w-full bg-neutral-800 border border-neutral-700 justify-between flex flex-col shadow-lg rounded-xl my-4">
      
        {
          url_to_image && 
          <div className="flex w-full h-64">
          <img 
            className="object-cover w-full h-full rounded-t-xl" 
            src={
              url_to_image 
            }
          />
      </div>

        }
      <div className='flex flex-col text-left px-6 py-3 w-full'>
        <div className='flex mb-2'>
          <div className='flex flex-col'>
            <div className="flex flex-row gap-x-1 items-center justify-start py-3 w-full">
              <h5 className="text-lg font-semibold text-neutral-200">{`${moment(published_at).format('dddd, DD MMMM YYYY HH:mm')}` ?? 'Day'}</h5>
            </div>
            <a 
              href={url} 
              target="_blank" 
              rel="noreferrer"
              className="text-indigo-100 text-2xl font-semibold mb-2"
            >
              {title}
            </a>
            <div className="flex flex-row gap-x-1 items-center justify-start py-3 w-full">
              <h5 className="text-md font-semibold">{source_name} - {author}</h5>
            </div>
          </div>
        </div>
        <div className="my-2 text-neutral-300">
          {description}  
        </div>
      </div>
      <div className='flex flex-row gap-3 px-6 py-4 my-2'>
        <a 
          className="text-neutral-200 bg-indigo-600 px-4 py-2 rounded-lg text-sm"
          href={url} 
          target="_blank" 
          rel="noreferrer"
        >
          View
        </a>
        {
          handleAdd ?
          <button 
            className="inline-flex items-center text-neutral-200 bg-emerald-600 px-3 py-2 rounded-lg"
            onClick={() => handleAdd(content)}
          >
            <HiPlusCircle className="w-4 h-4 mr-1"/>
            Collection
          </button> : null
        }
        {
          handleDelete ?
          <button 
            className="inline-flex items-center text-neutral-200 bg-red-600 px-3 py-2 rounded-lg"
            onClick={() => handleDelete(content)}
          >
            <HiTrash className="w-4 h-4 mr-1"/>
            Delete
          </button> : null
        }
      </div>
    </div>
  )
};

export default Article;