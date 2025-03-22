import FAQ from "./faq"

export default function FAQs() {
    const FAQs = [
        {   id: 1,
            question: "How does the YouTube video summarization work?",
            answer: "Our system extracts the video’s transcript using the YouTube API, processes it using AI-powered text analysis, and generates a concise summary with key insights."
        },
        {   id: 2,
            question: "How long does it take to summarize a video?",
            answer: "The summarization process typically takes a few seconds, depending on the video's length and transcript availability."
        },
        {   id: 3,
            question: "Can I summarize videos without captions?",
            answer: "No, our tool relies on YouTube’s transcript feature. If a video doesn’t have captions, it cannot be summarized."
        },
        {   id: 4,
            question: "Do I need to sign up to use the summarizer?",
            answer: "No, you can summarize videos without an account, but logged-in users may get extra features like history tracking and personalized insights."
        },
        {   id: 5,
            question: "Is this tool free to use?",
            answer: "Yes! The basic summarization feature is completely free. We may introduce premium features in the future."
        },
    ]
    return (
        <>
            <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
                <h2 className="text-base/7 font-semibold text-lime-600 text-center">FAQ's</h2>
                <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-center text-gray-900 mb-2 sm:text-6xl">
                    Frequently Asked Questions
                </p>
                {
                    FAQs && FAQs.map((faq) => (
                        <FAQ faq={faq} key={faq.id}/>
                    ))
                }
            </div>
        </>
    )
}