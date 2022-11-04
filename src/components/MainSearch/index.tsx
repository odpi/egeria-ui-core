import {fetchTypes, ASSET_CATALOG_PATH, isStringLonger, QUERY_MIN_LENGTH, isArrayEmpty} from "@lfai/egeria-js-commons";
import {Loader, MultiSelect, TextInput} from "@mantine/core";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Search} from "tabler-icons-react";

export function MainSearch() {
    const navigate = useNavigate();

    const [typesData, setTypesData]: [any, any] = useState({
        isLoading: false,
        typesData: []
    });

    const [types, setTypes]: [any, any] = useState({value: [], isValid: false, isPristine: true});
    const [q, setQ]: [any, any] = useState({value: '', isValid: false, isPristine: true});

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter' && q.isValid && types.isValid) {
            navigate(`${ASSET_CATALOG_PATH}?q=${q.value}&types=${types.value.join(',')}`)
        }
    };

    useEffect(() => {
        setTypesData({...typesData, isLoading: true});

        const bringTypes = async () => {
            const rawTypesData = await fetchTypes();

            setTypesData({
                isLoading: false,
                typesData: [...rawTypesData]
            });
        };

    bringTypes();
  }, []);

  return <>
      <MultiSelect data={typesData.typesData}
                   value={types.value}
                   disabled={typesData.isLoading || typesData.typesData.length === 0}
                   onChange={(value: any) => setTypes({
                       value: [...value],
                       isValid: !isArrayEmpty(value),
                       isPristine: false
                   })}
                   error={!types.isPristine && !types.isValid ? 'At least one type has to be selected' : ''}
                   radius="sm"
                   size="xs"
                   placeholder="Type"
                   style={{width: '15%', marginRight: '1%'}}
                   rightSection={
                       typesData.isLoading ? <Loader size={22}/> : <></>
                   }/>

      <TextInput style={{width: '30%'}}
                 icon={<Search size={18}/>}
                 radius="sm"
                 size="xs"
                 value={q.value}
                 disabled={typesData.isLoading || typesData.typesData.length === 0}
                 error={!q.isPristine && !q.isValid ? 'Query must be at least ' + QUERY_MIN_LENGTH + ' characters' : ''}
                 onKeyPress={handleKeyPress}
                 onChange={(event: any) => setQ({
                     value: event.currentTarget.value,
                     isValid: isStringLonger(event.currentTarget.value, QUERY_MIN_LENGTH),
                     isPristine: false
                 })}
                 placeholder="Search terms"
                 rightSectionWidth={42}/>
  </>
}