import React from "react";
import styles from './Select.module.scss'
import {Controller} from "react-hook-form";
import ReactSelect from "react-select";

interface Props {
    options: { value: string; label: string }[];
    title?: string;
    placeholder?: string;
    props?: any;
    control?: any;
}

export const Select = ({title, placeholder, options, control, props}: Props) => {
    return (
        <div className={styles.select__wrapper}>
            {title && <label className={styles.select__label}>{title}</label>}
            <Controller control={control} render={({field}) => <ReactSelect className={styles.select} options={options}
                                                                            value={options.find((c) => c.value === field.value)}
                                                                            onChange={(val: any) => field.onChange(val.value)
                                                                            }
                                                                            theme={(theme) => ({
                                                                                ...theme,
                                                                                borderRadius: 0,
                                                                                colors: {
                                                                                    ...theme.colors,
                                                                                    primary25: '#626734',
                                                                                    primary: 'black',
                                                                                },
                                                                            })}/>}
                        name={props.name}/>
            {/*<select className={styles.select} placeholder={placeholder}{...props}>*/}

            {/*    {options.map(option =>*/}
            {/*        <option key={option.value} value={option.value}>*/}
            {/*            <div className={styles.select__option}>{option.label} </div>*/}
            {/*        </option>*/}
            {/*    )}*/}


            {/*</select>*/}
        </div>
    )
};
