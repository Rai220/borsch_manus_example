import React, { useState } from 'react';
import './App.css';

// Define types for recipe steps and variations
interface RecipeStep {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  animation_url?: string; // Path to visual asset in /public folder
  tips?: string;
}

interface Variations {
  base: 'meat' | 'vegetarian';
  cabbage: 'with' | 'without';
}

// Data for recipe steps
const meatRecipeSteps: RecipeStep[] = [
  { id: 1, title: "Welcome & Ingredient Showcase (Meat)", description: "Gather your ingredients for a hearty meat-based borscht.", ingredients: ["Beef/Pork", "Beets", "Potatoes", "Carrots", "Onions", "Cabbage (if selected)", "Garlic", "Dill", "Broth", "Tomato Paste", "Vinegar", "Oil", "Spices"], animation_url: "/assets/images/ingredient_showcase.png" },
  { id: 2, title: "Prepare the Broth", description: "Simmer meat with aromatics to create a rich broth.", ingredients: ["Beef/Pork", "Water", "Onion", "Carrot", "Celery", "Bay Leaves"], animation_url: "/assets/images/prepare_broth.png" },
  { id: 3, title: "Prepare Vegetables", description: "Chop, dice, and grate all your vegetables.", ingredients: ["Beets", "Potatoes", "Carrots", "Onions", "Cabbage (if selected)", "Garlic"], animation_url: "/assets/images/prepare_vegetables.png" },
  { id: 4, title: "Cook Core Vegetables", description: "Cook beets, potatoes, and carrots in the broth.", ingredients: ["Broth", "Shredded Meat", "Beets", "Potatoes", "Carrots"], animation_url: "/assets/images/cook_core_vegetables.png" }, 
  { id: 5, title: "Make Zazharka", description: "Sauté onions, carrots (and optional bell pepper/celery) with tomato paste.", ingredients: ["Oil", "Onion", "Carrots", "Tomato Paste"], animation_url: "/assets/images/make_zazharka.png" },
  { id: 6, title: "Combine & Simmer", description: "Add zazharka and cabbage (if selected) to the pot. Simmer gently.", ingredients: ["Cabbage (if selected)"], animation_url: "/assets/images/combine_and_simmer.png" },
  { id: 7, title: "Final Seasoning", description: "Add vinegar, garlic, dill, salt, and pepper.", ingredients: ["Vinegar", "Garlic", "Dill", "Salt", "Pepper"], animation_url: "/assets/images/final_seasoning.png" },
  { id: 8, title: "Rest & Serve", description: "Let borscht rest, then serve with sour cream and fresh herbs.", ingredients: ["Sour Cream", "Fresh Dill/Parsley"], animation_url: "/assets/images/serve_borscht.png", tips: "Resting allows flavors to meld beautifully. Serve with dark rye bread for an authentic experience!" },
];

const vegetarianRecipeSteps: RecipeStep[] = [
  { id: 1, title: "Welcome & Ingredient Showcase (Vegetarian)", description: "Gather your ingredients for a delicious vegetarian borscht.", ingredients: ["Beets", "Potatoes", "Carrots", "Onions", "Cabbage (if selected)", "Garlic", "Dill", "Vegetable Broth", "Tomato Paste", "Vinegar", "Oil", "Spices", "Beans (optional)"], animation_url: "/assets/images/ingredient_showcase.png" },
  { id: 2, title: "Prepare Vegetables", description: "Chop, dice, and grate all your vegetables.", ingredients: ["Beets", "Potatoes", "Carrots", "Onions", "Cabbage (if selected)", "Garlic"], animation_url: "/assets/images/prepare_vegetables.png" },
  { id: 3, title: "Sauté Beets & Cook Core Vegetables", description: "Sauté beets, then add broth, potatoes, and carrots.", ingredients: ["Oil", "Beets", "Vegetable Broth", "Potatoes", "Carrots"], animation_url: "/assets/images/cook_core_vegetables.png" },
  { id: 4, title: "Make Zazharka", description: "Sauté onions, carrots (and optional bell pepper/celery) with tomato paste.", ingredients: ["Oil", "Onion", "Carrots", "Tomato Paste"], animation_url: "/assets/images/make_zazharka.png" },
  { id: 5, title: "Combine & Simmer", description: "Add zazharka, cabbage (if selected), and beans (if using) to the pot. Simmer gently.", ingredients: ["Cabbage (if selected)", "Beans (optional)"], animation_url: "/assets/images/combine_and_simmer.png" },
  { id: 6, title: "Final Seasoning", description: "Add vinegar, garlic, dill, salt, and pepper.", ingredients: ["Vinegar", "Garlic", "Dill", "Salt", "Pepper"], animation_url: "/assets/images/final_seasoning.png" },
  { id: 7, title: "Rest & Serve", description: "Let borscht rest, then serve with sour cream (or vegan alternative) and fresh herbs.", ingredients: ["Sour Cream/Vegan Alt.", "Fresh Dill/Parsley"], animation_url: "/assets/images/serve_borscht.png", tips: "Resting allows flavors to meld beautifully. Serve with dark rye bread for an authentic experience!" },
];

function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [variations, setVariations] = useState<Variations>({ base: 'meat', cabbage: 'with' });
  const [started, setStarted] = useState(false);

  const recipeSteps = variations.base === 'meat' ? meatRecipeSteps : vegetarianRecipeSteps;
  const currentStepData = recipeSteps[currentStepIndex];

  const handleNextStep = () => {
    if (currentStepIndex < recipeSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setStarted(false);
  };

  const handleStartCooking = () => {
    setCurrentStepIndex(0); 
    setStarted(true);
  };

  if (!started) {
    return (
      <div className="App welcome-screen">
        <header className="App-header">
          <h1>Borscht: A Visual Cooking Guide</h1>
        </header>
        <main className="welcome-content">
          <p>Welcome to the Visual Borscht Guide! Learn to make this iconic soup step-by-step.</p>
          <div className="variations-selector">
            <label htmlFor="base-select">Borscht Style: </label>
            <select 
              id="base-select"
              value={variations.base} 
              onChange={(e) => setVariations({ ...variations, base: e.target.value as 'meat' | 'vegetarian' })}
            >
              <option value="meat">Meat-based</option>
              <option value="vegetarian">Vegetarian</option>
            </select>
            <label htmlFor="cabbage-select">Cabbage: </label>
            <select 
              id="cabbage-select"
              value={variations.cabbage} 
              onChange={(e) => setVariations({ ...variations, cabbage: e.target.value as 'with' | 'without' })}
            >
              <option value="with">With Cabbage</option>
              <option value="without">Without Cabbage</option>
            </select>
          </div>
          <button onClick={handleStartCooking}>Let's Start Cooking!</button>
        </main>
      </div>
    );
  }

  // Ensure currentStepData is available before rendering main content
  if (!currentStepData) {
    // This case should ideally not be reached if logic is correct, but acts as a safeguard
    return <div className="App"><p>Loading step data or error...</p></div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Borscht: A Visual Cooking Guide</h1>
        <div className="progress-bar">
          Step {currentStepIndex + 1} of {recipeSteps.length}
          <div 
            className="progress-bar-inner"
            style={{ width: `${((currentStepIndex + 1) / recipeSteps.length) * 100}%` }}
          ></div>
        </div>
      </header>

      <main className="App-main">
        <div className="visualization-area">
          {currentStepData.animation_url ? 
            <img src={currentStepData.animation_url} alt={currentStepData.title} style={{maxWidth: '100%', maxHeight: '400px', borderRadius: '8px'}} /> :
            <div className="placeholder-visual">Visual for: {currentStepData.title}</div>
          }
        </div>

        <div className="information-panel">
          <h2>{currentStepData.title}</h2>
          <p>{currentStepData.description}</p>
          <h3>Ingredients for this step:</h3>
          <ul>
            {currentStepData.ingredients.map((ingredient, index) => {
              if (ingredient === "Cabbage (if selected)") {
                if (variations.cabbage === 'with') {
                  return <li key={index}>Cabbage</li>;
                } else {
                  return null; // Skip cabbage if not selected
                }
              }
              return <li key={index}>{ingredient}</li>;
            }).filter(Boolean) // Remove null entries from map
            }
          </ul>
          {currentStepData.tips && <p><strong>Tip:</strong> {currentStepData.tips}</p>}
        </div>
      </main>

      <footer className="App-footer">
        <button onClick={handlePreviousStep} disabled={currentStepIndex === 0}>Previous Step</button>
        <button onClick={handleNextStep} disabled={currentStepIndex === recipeSteps.length - 1}>Next Step</button>
        <button onClick={handleRestart}>Restart</button>
      </footer>
    </div>
  );
}

export default App;

