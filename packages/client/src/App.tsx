import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Header } from "@/components/layout/Header/Header";
import { HomePage } from "@/pages/HomePage/HomePage";
import { FormBuilderPage } from "@/pages/FormBuilderPage/FormBuilderPage";
import { FormFillerPage } from "@/pages/FormFillerPage/FormFillerPage";
import { FormResponsesPage } from "@/pages/FormResponsesPage/FormResponsesPage";
import "@/styles/global.css";

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forms/new" element={<FormBuilderPage />} />
          <Route path="/forms/:id/edit" element={<FormBuilderPage />} />
          <Route path="/forms/:id/fill" element={<FormFillerPage />} />
          <Route path="/forms/:id/responses" element={<FormResponsesPage />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
