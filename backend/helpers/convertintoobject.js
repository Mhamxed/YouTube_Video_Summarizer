function convertIntoJsonString(res) {
    // Step 1: Extract the content between ```json and ```
    const startMarker = "```json\n";
    const endMarker = "\n```";
    const startIndex = res.indexOf(startMarker) + startMarker.length;
    const endIndex = res.lastIndexOf(endMarker);
    const jsonString = res.substring(startIndex, endIndex);

    // Step 2: Parse the string into a JavaScript object
    const jsonData = JSON.parse(jsonString);
    return jsonData
}

export default convertIntoJsonString;