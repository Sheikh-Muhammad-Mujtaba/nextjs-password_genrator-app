"use client";
import { useState, ChangeEvent } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function GeneratePasswordComponent() {
  // States for managing password options and generated password
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");

  // Character sets
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  // Update password length based on user input
  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLength(Number(e.target.value)); // No validation here, just updating state
  };

  // Generate the password based on selected criteria
  const generatePassword = (): void => {
    if (length < 8 || length > 32) {
      alert("Password length must be between 8 and 32 characters.");
      return;
    }
  
    let characterPool = "";
    if (includeUppercase) characterPool += uppercaseChars;
    if (includeLowercase) characterPool += lowercaseChars;
    if (includeNumbers) characterPool += numberChars;
    if (includeSymbols) characterPool += symbolChars;

    if (!characterPool) {
      alert("Please select at least one character type.");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }
    setPassword(generatedPassword);
  };

  // Copy generated password to clipboard
  const copyToClipboard = async (): Promise<void> => {
    if (!password) {
      alert("No password to copy.");
      return;
    }
    try {
      await navigator.clipboard.writeText(password);
      alert("Password copied to clipboard!");
    } catch (error) {
      console.error("Error copying password:", error);
      alert("Failed to copy password to clipboard.");
    }
  };

  // Toggle checkbox states

  const handleCheckboxChange =
    (setter: (value: boolean) => void) =>
    (checked: boolean): void => {
      setter(checked);
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Password generator UI */}
      <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="mx-auto max-w-md space-y-6">
          {/* Title and description */}
          <div className="text-center">
            <h1 className="text-3xl font-bold">Password Generator</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Create a secure password with just a few clicks.
            </p>
          </div>
          {/* Password generation form */}
          <div className="space-y-4">
            {/* Password length input */}
            <div className="space-y-2">
              <Label htmlFor="length">Password Length</Label>
              <Input
                id="length"
                type="number"
                min="8"
                max="32"
                value={length}
                onChange={handleLengthChange}
                className="w-full"
                aria-label="Password length input"
              />
            </div>
            {/* Character inclusion checkboxes */}
            <div className="space-y-2">
              <Label>Include:</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={handleCheckboxChange(setIncludeUppercase)}
                  aria-label="Include uppercase letters"
                />
                <Label htmlFor="uppercase">Uppercase Letters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={handleCheckboxChange(setIncludeLowercase)}
                  aria-label="Include lowercase letters"
                />
                <Label htmlFor="lowercase">Lowercase Letters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={handleCheckboxChange(setIncludeNumbers)}
                  aria-label="Include numbers"
                />
                <Label htmlFor="numbers">Numbers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={handleCheckboxChange(setIncludeSymbols)}
                  aria-label="Include symbols"
                />
                <Label htmlFor="symbols">Symbols</Label>
              </div>
            </div>
            {/* Generate password button */}
            <Button
              type="button"
              className="w-full"
              onClick={generatePassword}
              aria-label="Generate password button"
            >
              Generate Password
            </Button>
            {/* Generated password display and copy button */}
            {password && (
              <div className="space-y-2">
                <Label htmlFor="password">Generated Password</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="password"
                    type="text"
                    value={password}
                    readOnly
                    className="flex-1"
                    aria-label="Generated password field"
                  />
                  <Button
                    type="button"
                    onClick={copyToClipboard}
                    aria-label="Copy to clipboard"
                  >
                    Copy
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
