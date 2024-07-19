import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import { cn } from '@/utils/cn'
import { UseFormReturn } from 'react-hook-form'
import Select from 'react-select'
import { customStyles } from '@/store/type/selectType'
import { Dispatch, SetStateAction } from 'react'

interface inputProps {
  name: string
  placeholder?: string
  headerLabel?: string
  isDisabled?: boolean
  className?: string
  isLoading?: boolean
  isFetching?: boolean
  level1?: boolean
  level2?: boolean
  level3?: boolean
  level4?: boolean
  level5?: boolean
  setBulan?: Dispatch<SetStateAction<string>>
  setTahun?: Dispatch<SetStateAction<string>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form?: UseFormReturn | any | undefined
  data: {
    value: string
    label: string
  }[]
}

export function SelectListData({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  form,
  className,
  data,
  setBulan,
  setTahun,
  level1,
  level2,
  level3,
  level4,
  level5,
  isLoading,
  isFetching,
}: inputProps) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(
              `${level1 ? 'z-50' : level2 ? 'z-40' : level3 ? 'z-30' : level4 ? 'z-20' : level5 ? 'z-10' : 'z-0'} text-warna-dark flex w-full items-center gap-12 text-[2rem] phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]`,
              className,
            )}
          >
            {headerLabel && (
              <div className="text-warna-dark w-2/5 phones:w-full phones:text-left">
                <FormLabel className="font-roboto">{headerLabel}</FormLabel>
              </div>
            )}
            <div className="w-3/5 phones:w-full">
              <FormControl>
                <Select
                  {...field}
                  styles={{
                    ...customStyles,
                    singleValue: (provided) => ({
                      ...provided,
                      color: '#1F475C',
                      textTransform: 'uppercase',
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: '#1F475C',
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      padding: 0,
                      maxHeight: '27vh',
                      overflowY: 'auto',
                      '&::-webkit-scrollbar': {
                        width: 0,
                        height: 0,
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'transparent',
                        borderRadius: '6px',
                      },
                    }),
                    control: (provided) => ({
                      ...provided,
                      backgroundColor:
                        'rgb(255 255 255 / var(--tw-bg-opacity))',
                      border:
                        '1px solid rgb(203 213 225 / var(--tw-bg-opacity))',
                      borderRadius: '0.375rem',
                      fontSize: '2rem',
                    }),
                    option: (provided) => ({
                      ...provided,
                      backgroundColor:
                        'rgb(255 255 255 / var(--tw-bg-opacity))',
                      color: '#1F475C',
                      cursor: isDisabled ? 'not-allowed' : 'default',
                      ':hover': {
                        cursor: 'pointer',
                        backgroundColor:
                          'rgb(240 244 247 / var(--tw-bg-opacity))',
                      },
                    }),
                  }}
                  className={`${level1 ? 'z-50' : level2 ? 'z-40' : level3 ? 'z-30' : level4 ? 'z-20' : level5 ? 'z-10' : 'z-0'} text-[2rem]`}
                  options={data}
                  value={data.filter((item) => item.value === field.value)[0]}
                  placeholder={placeholder ?? 'Input here'}
                  onChange={(optionSelected: {
                    value: string
                    label: string
                  }) => {
                    field.onChange(optionSelected?.value)
                    form.setValue(name, optionSelected?.value)
                    if (setBulan) {
                      setBulan(optionSelected?.value)
                    }
                    if (setTahun) {
                      setTahun(optionSelected?.value)
                    }
                  }}
                  isDisabled={isDisabled}
                  isLoading={isLoading || isFetching}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
