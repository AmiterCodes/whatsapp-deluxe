import { View } from '@react-fullstack/fullstack';
export interface ConnectionScreenProps {
    /** qr code string
    *  @example ```1@9Q8tWf6bnezr8uVGwVCluyRuBOJ3tIglimzI5dHB0vQW2m4DQ0GMlCGf,f1/vGcW4Z3vBa1eDNl3tOjWqLL5DpYTI84DMVkYnQE8=,ZL7YnK2qdPN8vKo2ESxhOQ==``` */
    qr: string;
}
declare type ConnectionScreen = View<ConnectionScreenProps>;
export default ConnectionScreen;
