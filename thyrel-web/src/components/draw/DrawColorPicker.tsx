import Box from "../../styles/Box";
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { baseColor, bgFade } from "../../styles/colors";
import { Button, Grid } from "rsuite";
import { render } from "@testing-library/react";
import React from "react";
import { relative } from "path";

type DrawColorPickerProps = {
    colors: Array<string>;
    onChange?: (color: string) => void;
    color: string;
}

const SquareButton = styled.button({
    // left:'4px',
    // top:'4px',
    outline: 'none',
    borderRadius: '4px',
    width: '32px',
    height: '32px',
  });

// function renderColors(colors: Array<string>, actualColor:string){
//     //var col;
//     colors.map((color) =>{
//         if(color == actualColor){
//             return(<SquareButton className={css({border:'3px solid white', background:color})}></SquareButton>)
//         }
//         else{
//             return(<SquareButton className={css({background:color})}></SquareButton>)
//         }
//     });
// }

export default function DrawColorPicker({ colors, color , onChange }: DrawColorPickerProps) {
    return (
        <Box>   
            <Box width = {88}

                display = 'flex'
                // flexDirection = 'column'
                alignItems= 'flex-start'
                padding = '8px'

                height = {288}
                borderRadius = {5}
                justifyContent = "center"
                className={css({
                    background: baseColor,
                })}>
                    {/* <div> */}
                    {colors.map((Color) =>{
                        if(Color === color){
                            return(<SquareButton className={css({border:'3px solid white', background:Color})}></SquareButton>)
                        }
                        else{
                            return(<SquareButton className={css({background:Color})}></SquareButton>)
                        }
                    })}
                    {/* </div> */}
            </Box>
        </Box>
    );
}