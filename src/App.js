import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileImport from "./pages/FileImport"
import FileImportHistory from "./pages/FileImportHistory"
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminRequests from "./pages/AdminRequests";
import Workers from "./pages/Workers";
import SpecialInterface from "./pages/SpecialInterface";
import PageNotFound from "./pages/PageNotFound";
import MainLayout from "./pages/MainLayout";
import {useEffect} from "react";

function App() {
    useEffect(() => {
        console.log("App mounted");
    }, []);

    return (
        <div>
            <Router basename="/~s372828">
                <Routes>
                    <Route path="/" element={<MainLayout><Workers/></MainLayout>} />
                    <Route path="/admin-requests" element={<MainLayout><AdminRequests/></MainLayout>} />
                    <Route path="/special-interface" element={<MainLayout><SpecialInterface/></MainLayout>} />
                    <Route path="/file-import" element={<MainLayout><FileImport/></MainLayout>} />
                    <Route path="/file-import-history" element={<MainLayout><FileImportHistory/></MainLayout>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="*" element={<PageNotFound/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
