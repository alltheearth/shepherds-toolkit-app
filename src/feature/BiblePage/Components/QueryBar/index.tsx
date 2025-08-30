import { QueryBarContainer, FormQueryBar, SelectQueryBar, InputQueryBar, GridQueryBar, ButtonQueryBar } from "./styles";

export default function QueryBar(){
    return(
        <QueryBarContainer>
           <GridQueryBar>
                <FormQueryBar>
                        <SelectQueryBar id="version">
                            <option value={'nvi'}>NVI - Nova Versão Internacional</option>
                        </SelectQueryBar>
                        <SelectQueryBar id="book">
                            <option value={'João'}>João</option>
                            <option value={'1 Tessalonicenses'}>1 Tessalonicenses</option>
                            <option value={'2 Tessalonicenses'}>2 Tessalonicenses</option>
                        </SelectQueryBar>
                        <SelectQueryBar id="chapter">
                            <option value={'1'}>1</option>
                            <option value={'2'}>2</option>
                            <option value={'3'}>3</option>
                            <option value={'10'}>10</option>
                            <option value={'12'}>12</option>
                            <option value={'13'}>13</option>
                            <option value={'130'}>130</option>
                        </SelectQueryBar>
                        <InputQueryBar type="text" placeholder="Verso"/>
                        <ButtonQueryBar type="submit">Buscar</ButtonQueryBar>
                    </FormQueryBar>
            </GridQueryBar>         
        </QueryBarContainer>
    )
}