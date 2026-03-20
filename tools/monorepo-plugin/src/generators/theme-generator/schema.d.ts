import { WordPressGeneratorSchema } from "../helpers";

export interface ThemeGeneratorGeneratorSchema extends WordPressGeneratorSchema {
    parentTheme: string;
}
