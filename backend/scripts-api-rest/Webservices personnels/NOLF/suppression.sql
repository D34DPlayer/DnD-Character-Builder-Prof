create procedure DBA.http_suppression( IN in_name VARCHAR(16), IN in_token VARCHAR(20) )
Result ("status" INT)
BEGIN
	if (existentToken(in_token) = 1 )
	then
	begin
	delete from tbCharacter where nomChar = in_name AND username = (select username from tbSession where token = in_token );
	select 200;
	end
	else select 502;
	endif
END;