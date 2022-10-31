var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { fetchTypes, ASSET_CATALOG_PATH } from "@lfai/egeria-js-commons";
import { Loader, MultiSelect, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "tabler-icons-react";
export function MainSearch() {
    const navigate = useNavigate();
    const [typesData, setTypesData] = useState({
        isLoading: false,
        typesData: []
    });
    const [types, setTypes] = useState([]);
    const [q, setQ] = useState('');
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            navigate(`${ASSET_CATALOG_PATH}?q=${q}&types=${types.join(',')}`);
        }
    };
    useEffect(() => {
        setTypesData(Object.assign(Object.assign({}, typesData), { isLoading: true }));
        const bringTypes = () => __awaiter(this, void 0, void 0, function* () {
            const rawTypesData = yield fetchTypes();
            setTypesData({
                isLoading: false,
                typesData: [...rawTypesData]
            });
        });
        bringTypes();
    }, []);
    return _jsxs(_Fragment, { children: [_jsx(MultiSelect, { data: typesData.typesData, value: types, disabled: typesData.isLoading, onChange: (value) => setTypes([...value]), radius: "sm", size: "xs", placeholder: "Type", style: { width: '15%', marginRight: '1%' }, rightSection: typesData.isLoading ? _jsx(Loader, { size: 22 }) : _jsx(_Fragment, {}) }), _jsx(TextInput, { style: { width: '30%' }, icon: _jsx(Search, { size: 18 }), radius: "sm", size: "xs", value: q, disabled: typesData.isLoading, onKeyPress: handleKeyPress, onChange: (event) => setQ(event.currentTarget.value), placeholder: "Search terms", rightSectionWidth: 42 })] });
}
