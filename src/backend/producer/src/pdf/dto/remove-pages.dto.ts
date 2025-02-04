import { FileDto } from './file.dto';

export class RemovePagesDto extends FileDto {
	pagesToRemove: number[];
}
