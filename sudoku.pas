const
        fi='sudoku.inp'; fo='sudoku.out';
var
        f:text; a,b:array[1..10,1..10] of string;  fl1:boolean;
procedure rf;
var
        i,j,t:integer;
        st,s:string;
begin
        assign(f,fi); reset(f); st:='123456789';
        for i:=1 to 9 do
         for j:=1 to 9 do
         begin read(f,t); if t=0 then a[i,j]:=st else begin str(t,s); a[i,j]:=s; end; end;
         close(f);
end;
procedure hc(s:string;x,y:integer);
var
        i,j:integer;
        ktt,ktthc:boolean;
begin
        ktthc:=true;
        for i:=1 to 9 do
        begin
                if (length(a[x,i])>1)and(i<>y) then
                begin
                        ktt:=false;
                        for j:=1 to 9 do
                        if a[j,i]=s then begin ktt:=true; break; end;
                end;
                if ktt=false then begin ktthc:=false; break; end;
        end;
        if ktthc=true then a[x,y]:=s else
        begin
        for i:=1 to 9 do
        begin
                if (length(a[i,y])>1)and(i<>x)then
                begin
                        ktt:=false;
                        for j:=1 to 9 do
                        if a[i,j]=s then begin ktt:=true; break; end;
                end;
                if ktt=false then begin ktthc:=false; break; end;
        end;
        if ktthc=true then a[x,y]:=s;
        end;
end;
function kt(s:string;m,n:integer):boolean;
var
        i:integer;
begin
        kt:=true;
        for i:=1 to 9 do
        begin
                if (length(a[i,n])=1)and(i<>m)and(a[i,n]=s) then begin kt:=false; break; end;
                if (length(a[m,i])=1)and(i<>n)and(a[m,i]=s) then begin kt:=false; break; end;
        end;
end;
procedure logicalprocess;
var
        i,j,m,n,k,vt1,vt2:integer;
        s:string;
        ktc:boolean;
begin
        for i:=1 to 9 do
         for j:=1 to 9 do
         if length(a[i,j])>1 then
         begin
                for m:=1 to 9 do
                begin
                        if (length(a[i,m])=1)and(m<>j)and(pos(a[i,m],a[i,j])<>0) then delete(a[i,j],pos(a[i,m],a[i,j]),1);
                        if (length(a[m,j])=1)and(m<>i)and(pos(a[m,j],a[i,j])<>0) then delete(a[i,j],pos(a[m,j],a[i,j]),1);
                end;
                if i in [1..3] then vt1:=2 else if i in [4..6] then vt1:=5 else vt1:=8;
                if j in [1..3] then vt2:=2 else if j in [4..6] then vt2:=5 else vt2:=8;
                s:='';
                for m:=vt1-1 to vt1+1 do
                 for n:=vt2-1 to vt2+1 do
                 if (length(a[m,n])=1) and ((m<>i)or(n<>j)) then s:=s+a[m,n];
                for k:=1 to length(s) do if pos(s[k],a[i,j])>0 then delete(a[i,j],pos(s[k],a[i,j]),1);
                if length(a[i,j])>1 then
                begin
                        s:=a[i,j];
                        for k:=1 to length(s) do begin hc(s[k],i,j); if length(a[i,j])=1 then break; end;
                        if length(a[i,j])>1 then
                                for k:=1 to length(s) do
                                begin
                                        ktc:=true;
                                        for m:=vt1-1 to vt1+1 do
                                         for n:=vt2-1 to vt2+1 do
                                         if (length(a[m,n])>1)and((m<>i)or(n<>j)) then if kt(s[k],m,n)=true then ktc:=false;
                                        if ktc=true then begin a[i,j]:=s[k]; break; end;
                end;            end;
         end;
end;
function ddd(s:string;x,y:integer):boolean;
var
        i,j,k,vt1,vt2:integer;
        st:string;
begin
        ddd:=true;
        for i:=1 to 9 do
        begin
                if (length(b[x,i])=1)and(b[x,i]=s) then begin ddd:=false; break; end;
                if (length(b[i,y])=1)and(b[i,y]=s) then begin ddd:=false; break; end;
        end;
        if ddd=true then
        begin
         if x in [1..3] then vt1:=2 else if x in [4..6] then vt1:=5 else vt1:=8;
         if y in [1..3] then vt2:=2 else if y in [4..6] then vt2:=5 else vt2:=8;
         st:='';
         for i:=vt1-1 to vt1+1 do
          for j:=vt2-1 to vt2+1 do
          if (length(b[i,j])=1) and ((i<>x)or(j<>y)) then st:=st+b[i,j];
          for k:=1 to length(st) do
          if st[k]=s then begin ddd:=false; break; end;
         end;
end;
function ktm(x:integer):boolean;
var
        i,j,t,sum:integer;
begin
        ktm:=true;
        for i:=1 to 9 do
         begin
                sum:=0;
                for j:=1 to 9 do
                begin
                val(b[i,j],t);
                sum:=sum+t;
                end;
                if sum<>45 then begin ktm:=false; break; end;
         end;
end;
procedure dq(x,y:integer);
var
        i:integer;
begin
        if y>9 then begin y:=1; x:=x+1; end;
        if x=10 then exit;
        for i:=1 to length(a[x,y]) do
        begin
                if ddd(a[x,y][i],x,y)=true then b[x,y]:=a[x,y][i];
                if (x=9)and(y=9) then if ktm(1)=true then begin fl1:=true; exit; end;
                if length(b[x,y])=1 then if y<=9 then dq(x,y+1);
                if fl1=true then exit;
        end;
        if length(a[x,y])>1 then delete(b[x,y],1,1);
end;
procedure main;
var
        i,j:integer;
begin
        assign(f,fo);
        rewrite(f);
        fl1:=false;
        for i:=1 to 5 do logicalprocess;
        for i:=1 to 9 do for j:=1 to 9 do if length(a[i,j])=1 then b[i,j]:=a[i,j];
         dq(1,1);
        for i:=1 to 9 do
        begin
                for j:=1 to 9 do
                begin
                write(f,b[i,j],' '); if j in [3,6] then write(f,' ');
                end;
                writeln(f);
                if i in [3,6] then writeln(f);
        end;
        close(f);
end;
begin
        rf;
        main;
end.












