import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, PlayCircle, UploadCloud, FileText } from "lucide-react";

const steps = [
  { id: 1, title: "Enter YouTube URL", icon: PlayCircle, description: "Paste the link of the YouTube video you want to summarize." },
  { id: 2, title: "Fetching Video Data", icon: UploadCloud, description: "Our system retrieves the video's infos." },
  { id: 3, title: "Processing AI Summary", icon: FileText, description: "AI extracts key insights and generates a concise summary." },
  { id: 4, title: "Summary Ready!", icon: CheckCircle, description: "Your summarized content is now available to read or download." }
];

const SummarySteps = () => {
  const [activeStep, setActiveStep] = useState(0);

  return ( 
    <div className="flex flex-col gap-2 py-24 border-b-1 border-gray-300">
        <div className="relative isolate bg-white px-6 lg:px-8 text-center">
            <h2 className="text-base/7 font-semibold text-lime-600">How Does It Work?</h2>
            <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
                Step By Step Process
            </p>
        </div>
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg flex flex-col">
            <div className="relative border-l-4 border-lime-500 pl-6 space-y-6">
            {steps.map((step, index) => {
            const Icon = step.icon;
            return (
                <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: index <= activeStep ? 1 : 0.4, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                className="flex items-center space-x-4"
                >
                <Icon className={`w-8 h-8 text-${index <= activeStep ? "lime-600" : "gray-400"}`} />
                <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                </div>
                </motion.div>
            );
            })}
        </div>
        <div className="mt-6 text-center">
            {activeStep < steps.length - 1 ? (
            <button
                className="px-6 py-2 bg-lime-600 text-white font-semibold rounded-lg shadow-md hover:bg-lime-700"
                onClick={() => setActiveStep((prev) => prev + 1)}
            >
                Next Step
            </button>
            ) : (
            <button
                className="px-6 py-2 bg-lime-600 text-white font-semibold rounded-lg shadow-md hover:bg-lime-700"
                onClick={() => setActiveStep(0)}
            >
                Restart
            </button>
            )}
        </div>
        </div>
    </div>
  );
};

export default SummarySteps;
