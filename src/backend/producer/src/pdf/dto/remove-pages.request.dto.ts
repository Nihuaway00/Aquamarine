import { IsString, Matches } from 'class-validator';

export class RemovePagesRequestDto {
	@IsString()
	@Matches(/^\d+(,\s*\d+)*$/, {
		message: 'Неверный формат страниц для удаления',
	})
	pagesToRemove: string;
}
