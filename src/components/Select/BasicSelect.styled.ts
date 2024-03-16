
import styled from "@emotion/styled";
import { Select, MenuItem } from "@mui/material";

export const StyledSelect = styled(Select)(
    ({ theme }) => ({
        width: "200px",
        height: "40px",
        marginRight: 15,
        borderRadius: "10px",
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
    })
)
export const StyledMenuItem = styled(MenuItem)(
    ({ theme }) => ({
        margin: 12,
        fontSize: "14px",
        fontWeight: 500,
        padding: "5px 10px",
        borderRadius: "5px",
        transition: "all 0.2s ease-in-out",
        '&.Mui-selected, &:hover': {
            backgroundColor: theme.palette.mariner,
            color: 'white',
        },
    })
)


