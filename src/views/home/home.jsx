import "./home.css"
import upload from "../../assets/upload_svg.svg"
import Title from "../../components/title/title";
import TopBar from "../../components/top-bar/topBar";
import book from "../../assets/Books.png"
import flag from "../../assets/flag.png"
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import InputTextfield from "../../components/input-textfield/InputTextfield";
import OutputTextfield from "../../components/output-textfield/OutputTextfield";
import { useState } from "react";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");


  const [error, setError] = useState("");

  // const [inputTextWordCount, setInputTextWordCount] = useState(0);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check if the file is a .txt file
      if (file.name.endsWith(".txt")) {
        setError(""); // Clear error if valid file
        console.log("Uploaded file:", file.name);
      } else {
        setError("Only .txt files are allowed!");
      }
    }
  };


  const countWords = (text) => {
    if (!text) return 0; // Handle empty input

    return text
      .trim()
      .split(/\s+/) // Split by one or more whitespace characters (handles newlines, spaces, tabs)
      .filter(word => word !== "").length;
  };


  const handleChange = (e) => {
    console.log(e.target.value);
    if (countWords(e.target.value) > 200) {
      return
    } else {
      setInputText(e.target.value)
      console.log(countWords(e.target.value));
      setInputTextWordCount(countWords(e.target.value))
    }
  }


  return (
    <div className="base">
      <img
        src={flag}
        alt="Background"
        className="absolute bottom-0 left-0 w-[50vh] opacity-30 z-0"
      />
      <TopBar title="“नेपाली पाठ सारांश”" />
      <Header image={book} text="NTS" />
      <div className="pt-[24px] pl-[16px] pr-[50px] xl:pl-[50px] xl:pr-[50px] sm:pl-[18px] sm:pr-[60px]">
        <Title title="Nepali Text Summarizer" />
        {
          error && <div className="text-red-500 text-center text-sm underline italic pt-2">{error}</div>
        }
        <div className="xl:flex justify-center  xl:pt-[24px]">
          {/* Left text field */}
          <InputTextfield
            words={countWords(inputText)}
            value={inputText}
            onChange={handleChange}
            onUpload={handleFileUpload}
            upload={upload} />
          {/* Right text field */}
          <OutputTextfield
            value={outputText}
            word={countWords(outputText)} />

        </div>
      </div>
      <Button title="Summarize" onClick={() => {
        console.log("Summarize button clicked");
        setOutputText(inputText.split(" ").slice(0, inputText.split(" ").length / 2).join(" "))
      }} />

    </div>



  );

}

export default Home 