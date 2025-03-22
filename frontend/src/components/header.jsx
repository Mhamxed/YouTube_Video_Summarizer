import { Link } from "react-router-dom" 

export default function Header() {
    return (
    <div className="flex flex-col items-center text-center border-b-1 py-24 border-gray-300">  
        <button className="flex self-center gap-2 text-sm font-semibold border-1 border-gray-200 rounded-full cursor-pointer px-2 py-1 hover:border-gray-300 text-gray-900">
            Announcing our next round of funding
            <p className="text-sm font-semibold text-lime-600">Read more</p>
            <span className="text-lime-500" aria-hidden="true">&rarr;</span>
        </button>
        <h1 className="mt-4 md:mx-20 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            A Better Way To Consume Youtube Videos
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Get the value of a youtube video with one click.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
            to={"/analyze"}
            className="rounded-md bg-lime-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-lime-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
            >
            Summarize a Youtube Video
            </Link>
            <Link to={"/videos"} className="text-sm font-semibold text-gray-900">
            Videos <span aria-hidden="true">&rarr;</span>
            </Link>
        </div>
    </div>
    )
}