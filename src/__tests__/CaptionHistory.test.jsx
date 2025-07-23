import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { AuthContext } from "../utils/AuthContext";
import History from "../components/History";
import { StaticRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios")

test("displays caption if the user is logged in",async() => {
    const mockcaptions = ["Test caption 1", "Test caption 2"]
    axios.get.mockResolvedValueOnce({
        data: { captions: mockcaptions },
      });

  render(
    <StaticRouter>
      <AuthContext.Provider value={{ user: {email:"test@example.com"} }}>
        <History />
      </AuthContext.Provider>
    </StaticRouter>
  );
    const captionItems = await waitFor(() => screen.getAllByTestId("caption-item"))
    expect(captionItems).toHaveLength(mockcaptions.length)
    expect(captionItems[0]).toHaveTextContent("Test caption 1");
    expect(captionItems[1]).toHaveTextContent("Test caption 2");
})

test("shows go back link when the user is not logged in", () => {
    render(
      <StaticRouter>
        <AuthContext.Provider value={{ user: null }}>
          <History />
        </AuthContext.Provider>
      </StaticRouter>
    );
  
    const goBackLink = screen.getByTestId("go-back-link");
    expect(goBackLink).toBeInTheDocument();
    expect(goBackLink).toHaveAttribute("href", "/");
  });
