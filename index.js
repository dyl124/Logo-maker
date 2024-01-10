const inquirer = require("inquirer");
const fsPromises = require("fs/promises");

function generateCircleSvg(fillColor) {
  return `<circle cx="150" cy="100" r="80" fill="${fillColor}" />`;
}

function generateTriangleSvg(fillColor) {
  return `<polygon points="150, 18 244, 182 56, 182" fill="${fillColor}" />`;
}

function generateSquareSvg(fillColor) {
  return `<rect x="90" y="40" width="120" height="120" fill="${fillColor}" />`;
}

function generateSvg(text, textColor, shape, shapeFillColor) {
  const textElement = (text.length <= 3) ? `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>` : "";
  const shapeElement = getShapeElement(shape, shapeFillColor);

  return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${shapeElement}${textElement}</svg>`;
}

function getShapeElement(shape, fillColor) {
  switch (shape) {
    case "circle":
      return generateCircleSvg(fillColor);
    case "triangle":
      return generateTriangleSvg(fillColor);
    case "square":
      return generateSquareSvg(fillColor);
    default:
      return "";
  }
}

async function generateLogo() {
  try {
    const { text, textColor, selectedShape, shapeFillColor } = await inquirer.prompt([
      {
        name: "text",
        type: "input",
        message: "Enter text for the logo. (Must not be more than 3 characters.)",
        validate: (text) => text.length <= 3 || "The message must not contain more than 3 characters",
      },
      {
        name: "textColor",
        type: "input",
        message: "Enter a text color",
      },
      {
        name: "selectedShape",
        type: "list",
        message: "Select a shape for the logo",
        choices: ["circle", "square", "triangle"],
      },
      {
        name: "shapeFillColor",
        type: "input",
        message: "Enter a shape fill color",
      },
    ]);

    const svgContent = generateSvg(text, textColor, selectedShape, shapeFillColor);

    await fsPromises.writeFile("logo.svg", svgContent);
    console.log("Generated logo.svg");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

generateLogo();
