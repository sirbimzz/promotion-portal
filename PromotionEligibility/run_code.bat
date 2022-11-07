@ECHO OFF
TITLE Execute python script on anaconda environment
ECHO Please Wait...
:: Section 1: Activate the environment.
ECHO ============================
ECHO Activating Anaconda. Please wait...
ECHO ============================
@CALL "\\BNY-S-560\Anaconda\Scripts\activate.bat" base
:: Section 2: Execute python script.
ECHO ============================
ECHO Running Python run_check_v3.py. This may take a while. Please wait...
ECHO ============================
python "\\BNY-S-560\PromotionEligibility\python\run_check_v3.py"


ECHO ============================
ECHO Python script run successfully!
ECHO ============================
ECHO End
ECHO ============================