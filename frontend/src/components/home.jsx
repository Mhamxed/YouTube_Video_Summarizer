import Pricing from "./pricing";
import FAQs from "./faqs";
import SummarySteps from "./steps";
import Header from "./header";

function Home() {
    return (
      <>
        <main className="grid min-h-full flex-col items-center place-items-center bg-white px-6">
            <Header/>
            <SummarySteps/>
            <Pricing />
            <FAQs/>
        </main>
      </>
    )
  }

export default Home;
  
