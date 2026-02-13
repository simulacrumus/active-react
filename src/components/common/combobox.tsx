// import { type JSX } from "react";
// import { useTranslation } from "react-i18next";
// import { type Selectable } from "@/types/Selectable";

// import {
//   Combobox,
//   ComboboxCollection,
//   ComboboxContent,
//   ComboboxEmpty,
//   ComboboxGroup,
//   ComboboxInput,
//   ComboboxItem,
//   ComboboxLabel,
//   ComboboxList,
//   ComboboxSeparator,
// } from "../ui/combobox";

// export interface ComboBoxProps<T extends Selectable> {
//   availableItems: T[];
//   disabledItems?: T[];
//   selected?: T | null;
//   onSelectionChange: (item: T | null) => void;
//   placeholder?: string;
//   inputPlaceholder?: string;
//   getKey: (item: T) => string | number;
//   getLabel: (item: T) => string;
// }

// export function FilterComboBox<T extends Selectable>({
//   availableItems,
//   disabledItems = [],
//   selected = null,
//   onSelectionChange,
//   placeholder = "Select an option",
//   inputPlaceholder = "Search...",
//   getKey,
//   getLabel,
// }: ComboBoxProps<T>): JSX.Element {
//   const { t } = useTranslation();

//   const allItems = [...availableItems, ...disabledItems];
//   const items = [
//     { value: "Available", items: availableItems },
//     { value: "Unavailable", items: disabledItems },
//   ];
//   function handleChange(item: T | null) {
//     console.log(item);
//     onSelectionChange(item);
//   }

//   return (
//     <Combobox
//       items={items}
//       value={selected}
//       itemToStringLabel={(item) => item.title}
//       onValueChange={handleChange}
//       autoHighlight
//     >
//       <ComboboxInput placeholder={placeholder} />
//       <ComboboxContent>
//         <ComboboxEmpty>{t("common.noResultsFound")}</ComboboxEmpty>
//         <ComboboxList>
//           {(group, index) => (
//             <ComboboxGroup key={group.value} items={group.items}>
//               <ComboboxLabel>{group.value}</ComboboxLabel>
//               <ComboboxCollection>
//                 {(item) => (
//                   <ComboboxItem key={getKey(item)} value={item}>
//                     {item.title}
//                   </ComboboxItem>
//                 )}
//               </ComboboxCollection>
//               {index < allItems.length - 1 && <ComboboxSeparator />}
//             </ComboboxGroup>
//           )}
//         </ComboboxList>
//       </ComboboxContent>
//     </Combobox>
//   );
// }
