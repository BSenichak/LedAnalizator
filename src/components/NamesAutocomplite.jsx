import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { loadNames, setName } from "../store/apiReducer";

export default function NamesAutocomplite() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [selected, setSetselected] = React.useState(null);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    let objects = useSelector((state) => state.api.names).filter(
        (el) => el.tensorsCount < 50
    );
    console.log(objects);
    let object = useSelector((state) => state.api.choose);
    let loading = useSelector((state) => state.api.loading);

    React.useEffect(() => {
        if (object) {
            setSetselected(object);
        }
    }, [object]);

    React.useEffect(() => {
        let active = true;
        if (loading) {
            return undefined;
        }
        if (active) {
            setOptions([...objects]);
        }
        return () => {
            active = false;
        };
    }, [loading]);

    return (
        <Autocomplete
            sx={{ overflow: "hidden" }}
            open={open}
            onOpen={() => {
                setOpen(true);
                objects.length < 1 && dispatch(loadNames());
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionLabel={(option) =>
                option.name +
                (option.tensorsCount && " | " + option.tensorsCount)
            }
            options={options}
            loading={loading}
            value={selected}
            onChange={(event, value) => {
                setSetselected(value);
                dispatch(setName(value));
            }}
            renderInput={(params) => (
                <TextField
                    variant="outlined"
                    {...params}
                    label={t("add.names")}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}
